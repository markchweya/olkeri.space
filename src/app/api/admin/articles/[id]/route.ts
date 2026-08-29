import { NextResponse } from 'next/server'
import { z } from 'zod'

import { adminArticleSchema, toArticleRow } from '@/lib/admin-articles'
import { isAdminAuthenticated } from '@/lib/auth'
import { dbQuery } from '@/lib/db'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

const idSchema = z.uuid()

const updateSchema = z.union([
  adminArticleSchema.extend({ republish: z.boolean().optional() }),
  // Republish-only request: bump published_at without editing content.
  z.object({ republish: z.literal(true) }),
])

export async function PUT(request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  if (!idSchema.safeParse(id).success) {
    return NextResponse.json({ error: 'Invalid article id.' }, { status: 400 })
  }

  const parsed = updateSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid article.', details: z.treeifyError(parsed.error) },
      { status: 400 }
    )
  }

  if (!('title' in parsed.data)) {
    const rows = await dbQuery(
      'update articles set published_at = now() where id = $1 returning *',
      [id]
    )

    if (!rows) {
      return NextResponse.json({ error: 'Database is not configured.' }, { status: 500 })
    }

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 })
    }

    return NextResponse.json({ article: rows[0] })
  }

  const row = toArticleRow(parsed.data)

  if (!row) {
    return NextResponse.json({ error: 'Slug is required.' }, { status: 400 })
  }

  const rows = await dbQuery(
    // author and tags coalesce onto the stored value: the edit form does not
    // send them, and a bare assignment would blank the byline every time
    // somebody fixed a typo.
    `update articles set
       title = $1, slug = $2, content = $3, language = $4, summary = $5,
       category = $6, region = $7, source_name = $8, source_url = $9,
       image_url = $10, image_credit = $11,
       author = coalesce($12, author),
       tags = coalesce($13, tags),
       published_at = case when $14 then now() else published_at end
     where id = $15
     returning *`,
    [
      row.title,
      row.slug,
      row.content,
      row.language,
      row.summary,
      row.category,
      row.region,
      row.source_name,
      row.source_url,
      row.image_url,
      row.image_credit,
      row.author,
      row.tags,
      parsed.data.republish === true,
      id,
    ]
  )

  if (!rows) {
    return NextResponse.json({ error: 'Database is not configured.' }, { status: 500 })
  }

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Article not found.' }, { status: 404 })
  }

  return NextResponse.json({ article: rows[0] })
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  if (!idSchema.safeParse(id).success) {
    return NextResponse.json({ error: 'Invalid article id.' }, { status: 400 })
  }

  const rows = await dbQuery('delete from articles where id = $1 returning id', [id])

  if (!rows) {
    return NextResponse.json({ error: 'Database is not configured.' }, { status: 500 })
  }

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Article not found.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
