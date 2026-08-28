import { NextResponse } from 'next/server'
import { z } from 'zod'

import {
  createSessionToken,
  getClientKey,
  isAuthConfigured,
  rateLimit,
  setSessionCookie,
  verifyPassword,
} from '@/lib/auth'

export const runtime = 'nodejs'

const bodySchema = z.object({
  password: z.string().min(1).max(1000),
})

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: 'Admin auth is not configured (set SESSION_SECRET and ADMIN_PASSWORD_HASH).' },
      { status: 500 }
    )
  }

  if (!rateLimit(`login:${getClientKey(request)}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429 }
    )
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json({ error: 'Password is required.' }, { status: 400 })
  }

  if (!verifyPassword(parsed.data.password)) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
  }

  const token = createSessionToken()

  if (!token) {
    return NextResponse.json({ error: 'Could not create session.' }, { status: 500 })
  }

  await setSessionCookie(token)

  return NextResponse.json({ ok: true })
}
