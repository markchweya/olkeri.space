import { randomUUID } from 'node:crypto'

import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createSlug } from '@/lib/articles'
import { isConnectorAuthorized } from '@/lib/connector-auth'
import { dbQuery } from '@/lib/db'

export const runtime = 'nodejs'

const articleSchema = z.object({
  title: z.string().trim().min(1).max(300),
  slug: z.string().trim().max(300).optional(),
  content: z.string().trim().min(1).max(50_000),
  language: z.enum(['en', 'fr', 'de', 'es']).default('en'),
  summary: z.string().trim().max(500).optional(),
  category: z.string().trim().max(50).optional(),
  region: z.string().trim().max(50).optional(),
  tags: z.array(z.string().trim().min(1).max(50)).max(10).optional(),
  sourceName: z.string().trim().max(200).optional(),
  sourceUrl: z.url().max(2000).optional(),
  imageUrl: z.url().max(2000).optional(),
  imageCredit: z.string().trim().max(200).optional(),
  author: z.string().trim().max(120).optional(),
  publishNow: z.boolean().optional(),
})

const bodySchema = articleSchema.extend({
  translationGroupId: z.uuid().optional(),
  translations: z.array(articleSchema).max(3).optional(),
})

type ArticleInput = z.infer<typeof articleSchema>

function toRow(input: ArticleInput, translationGroupId: string) {
  const slug = createSlug(input.slug || input.title)

  if (!slug) return null

  return {
    title: input.title,
    slug,
    content: input.content,
    language: input.language,
    summary: input.summary ?? null,
    category: input.category?.toLowerCase() ?? null,
    region: input.region?.toLowerCase() ?? null,
    tags: input.tags && input.tags.length > 0 ? input.tags : null,
    source_name: input.sourceName ?? null,
    source_url: input.sourceUrl ?? null,
    image_url: input.imageUrl ?? null,
    image_credit: input.imageCredit ?? null,
    author: input.author ?? null,
    translation_group_id: translationGroupId,
    published_at: input.publishNow === false ? null : new Date().toISOString(),
  }
}

export async function POST(request: Request) {
  if (!process.env.OLKERI_CONNECTOR_TOKEN) {
    return NextResponse.json(
      { error: 'Connector server environment is not configured.' },
      { status: 500 }
    )
  }

  if (!isConnectorAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let json: unknown

  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be JSON.' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request body.', details: z.treeifyError(parsed.error) },
      { status: 400 }
    )
  }

  const body = parsed.data
  const translationGroupId = body.translationGroupId ?? randomUUID()
  const inputs: ArticleInput[] = [body, ...(body.translations ?? [])]

  const languages = new Set(inputs.map(input => input.language))

  if (languages.size !== inputs.length) {
    return NextResponse.json(
      { error: 'Each language can only appear once per request.' },
      { status: 400 }
    )
  }

  const published: {
    id: string
    title: string
    slug: string
    language: string
    published_at: string | null
  }[] = []

  for (const input of inputs) {
    const row = toRow(input, translationGroupId)

    if (!row) {
      return NextResponse.json({ error: 'Slug is required.' }, { status: 400 })
    }

    const rows = await dbQuery<(typeof published)[number]>(
      `insert into articles (
         title, slug, content, language, summary, category, region, tags,
         source_name, source_url, image_url, image_credit, author,
         translation_group_id, published_at
       ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       on conflict (language, slug) do update set
         title = excluded.title,
         content = excluded.content,
         summary = excluded.summary,
         category = excluded.category,
         region = excluded.region,
         tags = excluded.tags,
         source_name = excluded.source_name,
         source_url = excluded.source_url,
         image_url = excluded.image_url,
         image_credit = excluded.image_credit,
         author = excluded.author,
         translation_group_id = excluded.translation_group_id,
         published_at = excluded.published_at
       returning id, title, slug, language, published_at`,
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
        row.translation_group_id,
        row.published_at,
      ]
    )

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'Database is not configured or the insert failed.' },
        { status: 500 }
      )
    }

    published.push(rows[0])
  }

  const primary = published[0] ?? null

  return NextResponse.json({
    article: primary,
    articles: published,
    translationGroupId,
    paths: published.map(article => `/${article.language}/${article.slug}`),
    path: primary ? `/${primary.language}/${primary.slug}` : null,
  })
}
