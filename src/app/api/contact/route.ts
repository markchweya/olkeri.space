import { NextResponse } from 'next/server'
import { z } from 'zod'

import { dbQuery } from '@/lib/db'

export const runtime = 'nodejs'

/**
 * Receives enquiries from /contact.
 *
 * The form previously rendered a button with no handler, so every message a
 * visitor typed was silently discarded. Messages now land in the
 * contact_messages table; the reply itself is still a human job.
 */
const bodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  message: z.string().trim().min(10).max(5000),
  topic: z.string().trim().max(60).optional(),
  language: z.string().trim().max(10).optional(),
  // Honeypot: a real person leaves this empty because they never see it.
  // Accepted at any length so a filled one reaches the silent-success branch
  // below rather than bouncing off validation with a 400 that would tell a
  // bot exactly which field gave it away.
  company: z.string().max(200).optional(),
})

export async function POST(request: Request) {
  let json: unknown

  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be JSON.' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the form and try again.', details: z.treeifyError(parsed.error) },
      { status: 400 }
    )
  }

  // A filled honeypot is a bot. Answer as though it worked so it does not
  // learn anything, and store nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true })
  }

  const rows = await dbQuery<{ id: string }>(
    `insert into contact_messages (name, email, message, topic, source_language, user_agent)
     values ($1, $2, $3, $4, $5, $6)
     returning id`,
    [
      parsed.data.name,
      parsed.data.email,
      parsed.data.message,
      parsed.data.topic ?? null,
      parsed.data.language ?? null,
      request.headers.get('user-agent')?.slice(0, 500) ?? null,
    ]
  )

  // dbQuery returns null when the database is unconfigured or unreachable.
  // Say so rather than showing a success state over a lost message.
  if (!rows || rows.length === 0) {
    return NextResponse.json(
      { error: 'We could not save your message. Please email chweyahub@gmail.com instead.' },
      { status: 503 }
    )
  }

  return NextResponse.json({ ok: true })
}
