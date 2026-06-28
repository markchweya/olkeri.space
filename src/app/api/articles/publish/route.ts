import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

import { createSlug, isArticleLanguage, type ArticleLanguage } from '@/lib/articles'

export const runtime = 'nodejs'

const SUPABASE_URL = 'https://cxgqiutgebdovtiralom.supabase.co'

type PublishArticleBody = {
  title?: unknown
  slug?: unknown
  content?: unknown
  language?: unknown
  imageUrl?: unknown
  publishNow?: unknown
}

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

function validateBody(body: PublishArticleBody) {
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const content = typeof body.content === 'string' ? body.content.trim() : ''
  const slugInput = typeof body.slug === 'string' ? body.slug : title
  const slug = createSlug(slugInput)
  const language = typeof body.language === 'string' ? body.language : 'en'
  const imageUrl =
    typeof body.imageUrl === 'string' && body.imageUrl.trim()
      ? body.imageUrl.trim()
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
      image_url: imageUrl,
      published_at: body.publishNow === false ? null : new Date().toISOString(),
    },
  }
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

  const validation = validateBody(body)

  if ('error' in validation) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  const { data, error } = await supabase
    .from('ai_articles')
    .insert(validation.article)
    .select('id,title,slug,language,published_at')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({
    article: data,
    path: `/${data.language}/${data.slug}`,
  })
}
