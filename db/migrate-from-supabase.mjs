#!/usr/bin/env node
// One-time copy of existing articles from the old Supabase ai_articles
// table into the self-hosted Postgres database.
//
// Usage:
//   DATABASE_URL=postgres://... \
//   SUPABASE_URL=https://<project>.supabase.co \
//   SUPABASE_KEY=<publishable or service role key> \
//   node db/migrate-from-supabase.mjs
//
// Idempotent: rows that already exist (same language + slug) are skipped.

import { Pool } from 'pg'

const { DATABASE_URL, SUPABASE_URL, SUPABASE_KEY } = process.env

if (!DATABASE_URL || !SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Set DATABASE_URL, SUPABASE_URL and SUPABASE_KEY.')
  process.exit(1)
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === 'disable'
      ? undefined
      : { rejectUnauthorized: false },
})

async function fetchPage(offset, limit) {
  const url = new URL('/rest/v1/ai_articles', SUPABASE_URL)
  url.searchParams.set('select', '*')
  url.searchParams.set('order', 'created_at.asc')
  url.searchParams.set('offset', String(offset))
  url.searchParams.set('limit', String(limit))

  const response = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })

  if (!response.ok) {
    throw new Error(`Supabase fetch failed: ${response.status} ${await response.text()}`)
  }

  return response.json()
}

let offset = 0
let imported = 0
let skipped = 0
const pageSize = 500

for (;;) {
  const rows = await fetchPage(offset, pageSize)

  if (rows.length === 0) break

  for (const row of rows) {
    const result = await pool.query(
      `insert into articles (
         id, title, slug, content, language, summary, category, region, tags,
         source_name, source_url, image_url, image_credit,
         translation_group_id, views, created_at, updated_at, published_at
       ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
       on conflict (language, slug) do nothing`,
      [
        row.id,
        row.title,
        row.slug,
        row.content,
        row.language,
        row.summary ?? null,
        row.category ?? null,
        row.region ?? null,
        row.tags ?? null,
        row.source_name ?? null,
        row.source_url ?? null,
        row.image_url ?? null,
        row.image_credit ?? null,
        row.translation_group_id ?? null,
        row.views ?? 0,
        row.created_at,
        row.updated_at ?? row.created_at,
        row.published_at ?? null,
      ]
    )

    if (result.rowCount === 1) imported += 1
    else skipped += 1
  }

  offset += rows.length
  console.log(`Processed ${offset} rows...`)
}

await pool.end()
console.log(`Done. Imported ${imported}, skipped ${skipped} (already present).`)
