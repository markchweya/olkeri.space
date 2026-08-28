import { NextResponse } from 'next/server'

import { isArticleLanguage } from '@/lib/articles'
import { dbQuery } from '@/lib/db'

export const runtime = 'nodejs'

// Public read-only listing of recently published stories. Used by the
// automated news pipeline to avoid covering the same story twice.
export async function GET(request: Request) {
  const url = new URL(request.url)
  const languageParam = url.searchParams.get('language') ?? 'en'
  const limitParam = Number.parseInt(url.searchParams.get('limit') ?? '200', 10)

  if (!isArticleLanguage(languageParam)) {
    return NextResponse.json({ error: 'Unknown language.' }, { status: 400 })
  }

  const limit = Math.min(Math.max(Number.isNaN(limitParam) ? 200 : limitParam, 1), 500)

  const rows = await dbQuery<{
    slug: string
    title: string
    source_url: string | null
    published_at: string
  }>(
    `select slug, title, source_url, published_at from articles
     where language = $1 and published_at is not null
     order by published_at desc
     limit $2`,
    [languageParam, limit]
  )

  return NextResponse.json(
    { articles: rows ?? [] },
    {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
      },
    }
  )
}
