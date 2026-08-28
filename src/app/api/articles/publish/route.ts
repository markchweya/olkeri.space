import { randomUUID } from 'node:crypto'

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

import { createSlug, isArticleLanguage, type ArticleLanguage } from '@/lib/articles'

export const runtime = 'nodejs'

const SUPABASE_URL = 'https://cxgqiutgebdovtiralom.supabase.co'

type IncomingArticle = {
  title?: unknown
  slug?: unknown
  content?: unknown
  language?: unknown
  summary?: unknown
  imageUrl?: unknown
  imageCredit?: unknown
  category?: unknown
  region?: unknown
  tags?: unknown
  sourceName?: unknown
  sourceUrl?: unknown
  publishNow?: unknown
}

type PublishArticleBody = IncomingArticle & {
  translationGroupId?: unknown
  translations?: unknown
}

type ArticleRow = {
  title: string
  slug: string
  content: string
  language: ArticleLanguage
  image_url: string | null
  published_at: string | null
  translation_group_id: string
  summary: string | null
  category: string | null
  region: string | null
  tags: string[] | null
  source_name: string | null
  source_url: string | null
  image_credit: string | null
}

// Columns that exist only after supabase/ai_articles_news_upgrade.sql has run.
const EXTENDED_COLUMNS = [
  'translation_group_id',
  'summary',
  'category',
  'region',
  'tags',
  'source_name',
  'source_url',
  'image_credit',
] as const

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get('authorization') ?? ''
  const [scheme, token] = authorization.split(' ')

  if (scheme.toLowerCase() !== 'bearer' || !token) {
    return null
  }

  return token
}

function optionalString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function validateArticle(
  body: IncomingArticle,
  translationGroupId: string
): { error: string } | { article: ArticleRow } {
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const content = typeof body.content === 'string' ? body.content.trim() : ''
  const slugInput = typeof body.slug === 'string' ? body.slug : title
  const slug = createSlug(slugInput)
  const language = typeof body.language === 'string' ? body.language : 'en'
  const tags = Array.isArray(body.tags)
    ? body.tags.filter((tag): tag is string => typeof tag === 'string' && !!tag.trim())
    : null

  if (!title) return { error: 'Title is required.' }
  if (!slug) return { error: 'Slug is required.' }
  if (!content) return { error: 'Article content is required.' }
  if (!isArticleLanguage(language)) {
    return { error: 'Language must be one of: en, fr, de.' }
  }

  return {
    article: {
      title,
      slug,
      content,
      language: language as ArticleLanguage,
      image_url: optionalString(body.imageUrl),
      published_at: body.publishNow === false ? null : new Date().toISOString(),
      translation_group_id: translationGroupId,
      summary: optionalString(body.summary),
      category: optionalString(body.category)?.toLowerCase() ?? null,
      region: optionalString(body.region)?.toLowerCase() ?? null,
      tags: tags && tags.length > 0 ? tags : null,
      source_name: optionalString(body.sourceName),
      source_url: optionalString(body.sourceUrl),
      image_credit: optionalString(body.imageCredit),
    },
  }
}

function stripExtendedColumns(row: ArticleRow) {
  const base: Record<string, unknown> = { ...row }

  for (const column of EXTENDED_COLUMNS) {
    delete base[column]
  }

  return base
}

function isMissingColumnError(error: { code?: string; message?: string } | null) {
  if (!error) return false

  return (
    error.code === '42703' ||
    error.code === 'PGRST204' ||
    /column|schema cache/i.test(error.message ?? '')
  )
}

export async function POST(request: Request) {
  const expectedToken = process.env.OLKERI_CONNECTOR_TOKEN
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? SUPABASE_URL

  if (!expectedToken || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Connector server environment is not configured.' },
      { status: 500 }
    )
  }

  if (getBearerToken(request) !== expectedToken) {
    return unauthorized()
  }

  let body: PublishArticleBody

  try {
    body = (await request.json()) as PublishArticleBody
  } catch {
    return NextResponse.json({ error: 'Request body must be JSON.' }, { status: 400 })
  }

  const translationGroupId =
    typeof body.translationGroupId === 'string' && body.translationGroupId.trim()
      ? body.translationGroupId.trim()
      : randomUUID()

  const incoming: IncomingArticle[] = [body]

  if (Array.isArray(body.translations)) {
    for (const translation of body.translations) {
      if (translation && typeof translation === 'object') {
        incoming.push(translation as IncomingArticle)
      }
    }
  }

  const rows: ArticleRow[] = []

  for (const item of incoming) {
    const validation = validateArticle(item, translationGroupId)

    if ('error' in validation) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    rows.push(validation.article)
  }

  const seenLanguages = new Set(rows.map(row => row.language))

  if (seenLanguages.size !== rows.length) {
    return NextResponse.json(
      { error: 'Each language can only appear once per request.' },
      { status: 400 }
    )
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  let { data, error } = await supabase
    .from('ai_articles')
    .upsert(rows, { onConflict: 'language,slug' })
    .select('id,title,slug,language,published_at')

  // Before the news schema upgrade has been applied, retry without the new columns.
  if (isMissingColumnError(error)) {
    ;({ data, error } = await supabase
      .from('ai_articles')
      .upsert(rows.map(stripExtendedColumns), { onConflict: 'language,slug' })
      .select('id,title,slug,language,published_at'))
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  const articles = data ?? []
  const primary = articles[0] ?? null

  return NextResponse.json({
    article: primary,
    articles,
    translationGroupId,
    paths: articles.map(article => `/${article.language}/${article.slug}`),
    path: primary ? `/${primary.language}/${primary.slug}` : null,
  })
}
