import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto'

import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'olkeri_admin_session'
const SESSION_TTL_SECONDS = 12 * 60 * 60

function getSessionSecret() {
  return process.env.SESSION_SECRET ?? null
}

export function isAuthConfigured() {
  return Boolean(
    getSessionSecret() &&
      (process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD)
  )
}

function safeEqual(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b)
}

// Accepts either ADMIN_PASSWORD_HASH ("scrypt$<salt-hex>$<hash-hex>",
// generated with scripts/hash-admin-password.mjs) or, as a simpler
// fallback, a plain ADMIN_PASSWORD. The hash form is preferred: the
// real password then never lives in an environment variable.
export function verifyPassword(password: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH

  if (hash) {
    const [scheme, saltHex, digestHex] = hash.split('$')

    if (scheme !== 'scrypt' || !saltHex || !digestHex) return false

    try {
      const salt = Buffer.from(saltHex, 'hex')
      const expected = Buffer.from(digestHex, 'hex')
      const actual = scryptSync(password, salt, expected.length)

      return safeEqual(actual, expected)
    } catch {
      return false
    }
  }

  const plain = process.env.ADMIN_PASSWORD

  if (!plain) return false

  return safeEqual(Buffer.from(password), Buffer.from(plain))
}

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function createSessionToken() {
  const secret = getSessionSecret()

  if (!secret) return null

  const payload = `${Date.now() + SESSION_TTL_SECONDS * 1000}.${randomBytes(16).toString('base64url')}`

  return `${Buffer.from(payload).toString('base64url')}.${sign(payload, secret)}`
}

export function verifySessionToken(token: string | undefined) {
  const secret = getSessionSecret()

  if (!secret || !token) return false

  const [encodedPayload, signature] = token.split('.')

  if (!encodedPayload || !signature) return false

  let payload: string

  try {
    payload = Buffer.from(encodedPayload, 'base64url').toString()
  } catch {
    return false
  }

  const expected = sign(payload, secret)

  if (!safeEqual(Buffer.from(signature), Buffer.from(expected))) return false

  const expiry = Number.parseInt(payload.split('.')[0] ?? '', 10)

  return Number.isFinite(expiry) && Date.now() < expiry
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()

  cookieStore.delete(SESSION_COOKIE)
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()

  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}

// Fixed-window in-memory rate limiter. Per server instance — an
// additional shared store would be needed for multi-instance strictness,
// but this blocks the basic online brute-force case.
const attempts = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now()
  const entry = attempts.get(key)

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  entry.count += 1

  return entry.count <= max
}

export function getClientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')

  return forwarded?.split(',')[0]?.trim() || 'unknown'
}
