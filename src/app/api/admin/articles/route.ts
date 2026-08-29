import { NextResponse } from 'next/server'
import { z } from 'zod'

import { adminArticleSchema, toArticleRow } from '@/lib/admin-articles'
import { isAdminAuthenticated } from '@/lib/auth'
import { dbQuery } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rows = await dbQuery(
    `select * from articles
     order by coalesce(published_at, created_at) desc
     limit 1000`
  )

  if (!rows) {
    return NextResponse.json({ error: 'Database is not configured.' }, { status: 500 })
  }

  return NextResponse.json({ articles: rows })
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const parsed = adminArticleSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid article.', details: z.treeifyError(parsed.error) },
      { status: 400 }
    )
  }

  const row = toArticleRow(parsed.data)

  if (!row) {
    return NextResponse.json({ error: 'Slug is required.' }, { status: 400 })
  }

  const rows = await dbQuery(
    `insert into articles (
       title, slug, content, language, summary, category, region, tags,
       source_name, source_url, image_url, image_credit, author, published_at
     ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
     on conflict (language, slug) do nothing
     returning *`,
    [
      row.title,
      row.slug,
      row.content,
      row.language,
      row.summary,
      row.category,
      row.region,
      row.tags,
      row.source_name,
      row.source_url,
      row.image_url,
      row.image_credit,
      row.author,
      parsed.data.publishNow === false ? null : new Date().toISOString(),
    ]
  )

  if (!rows) {
    return NextResponse.json({ error: 'Database is not configured.' }, { status: 500 })
  }

  if (rows.length === 0) {
    return NextResponse.json(
      { error: 'An article with this slug and language already exists.' },
      { status: 409 }
    )
  }

  return NextResponse.json({ article: rows[0] })
}
