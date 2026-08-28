# Olkeri — self-hosted database & security

The site no longer uses Supabase for anything. All content lives in a
password-protected Postgres database that you own.

## Database

The database is plain Postgres — you own it wherever it runs. Two ways to
run it:

1. **Fully self-hosted (your own server / VPS)**:
   `POSTGRES_PASSWORD=your-strong-password docker compose up -d` starts
   Postgres in Docker with the schema applied automatically and data in a
   persistent volume. Your `DATABASE_URL` is then
   `postgres://olkeri:your-strong-password@<server-ip>:5432/olkeri`.
   Note: if the site runs on Vercel, Vercel's servers must be able to
   reach the database over the network — open port 5432 deliberately and
   keep the strong password, or run the site on the same server.
2. **Managed Postgres you own** (Render via `render.yaml`, or any
   provider): they run the machine, but the database, its data, and its
   password are yours; copy the connection string they show you.

- Schema: `db/schema.sql` — applied automatically by docker compose, or
  apply once with `psql "$DATABASE_URL" -f db/schema.sql`.
- The app connects through the `DATABASE_URL` connection string (which
  carries the database password). Optional `DATABASE_SSL`:
  `require` (default), `verify` (CA-verified TLS), or `disable`
  (private-network connections only).
- `render.yaml` provisions a managed Postgres (`olkeri-postgres`) on
  Render if you deploy the blueprint there; any Postgres provider or a
  self-managed server works the same — only `DATABASE_URL` matters.
- One-time content migration from the old Supabase table:
  `DATABASE_URL=... SUPABASE_URL=... SUPABASE_KEY=... node db/migrate-from-supabase.mjs`
  (idempotent; preserves ids, views and timestamps).

## Environment variables (site host, e.g. Vercel)

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (includes the password) |
| `DATABASE_SSL` | Optional TLS mode: `require` (default) / `verify` / `disable` |
| `OLKERI_CONNECTOR_TOKEN` | Bearer token for `POST /api/articles/publish` |
| `SESSION_SECRET` | Long random string signing admin session cookies |
| `ADMIN_PASSWORD_HASH` | Admin password hash from `node scripts/hash-admin-password.mjs '<password>'` |
| `ADMIN_PASSWORD` | Plain-text fallback if no hash is set (hash preferred) |

Generate strong values, e.g. `openssl rand -base64 48` for
`SESSION_SECRET` and `OLKERI_CONNECTOR_TOKEN`.

## Security measures in place

- **Database**: parameterized SQL everywhere (no string interpolation);
  TLS on connections; credentials only in `DATABASE_URL` server-side —
  nothing database-related ships to the browser.
- **Admin**: password verified with scrypt against `ADMIN_PASSWORD_HASH`
  (constant-time comparison); sessions are HMAC-signed, expiring tokens
  in an `httpOnly`, `Secure`, `SameSite=Strict` cookie (blocks XSS
  session theft and CSRF); login rate-limited (5 attempts / 15 min per
  IP); all CRUD happens in server routes that re-check the session.
- **Publish API**: bearer token compared in constant time; zod schema
  validation with length caps on every field.
- **Headers on every response** (`next.config.ts`): Content-Security-Policy
  (self + Google ad hosts only for scripts/frames), HSTS,
  `X-Content-Type-Options: nosniff`, `X-Frame-Options`,
  `Referrer-Policy`, restrictive `Permissions-Policy`;
  `X-Powered-By` disabled.
- **Robots**: `/admin` and `/api/` are excluded from crawling.

## Rotating credentials

- Admin password: run the hash script again, update
  `ADMIN_PASSWORD_HASH`, redeploy. Sessions expire on their own (12 h);
  rotating `SESSION_SECRET` invalidates all of them immediately.
- Publish token: change `OLKERI_CONNECTOR_TOKEN` on the site host and in
  the claude.ai/code environment that runs the news pipeline.
- Database password: rotate with your Postgres provider, update
  `DATABASE_URL`.
