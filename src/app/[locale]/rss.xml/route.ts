import { appCopy, getArticleExcerpt, isArticleLanguage } from '@/lib/articles'
import { getLatestArticles } from '@/lib/news'

export const revalidate = 900

const BASE_URL = 'https://olkeri.space'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params

  if (!isArticleLanguage(locale)) {
    return new Response('Not found', { status: 404 })
  }

  const copy = appCopy[locale]
  const articles = await getLatestArticles(locale, 50)

  const items = articles
    .map(article => {
      const url = `${BASE_URL}/${article.language}/${article.slug}`
      const pubDate = new Date(
        article.published_at ?? article.created_at
      ).toUTCString()

      return [
        '    <item>',
        `      <title>${escapeXml(article.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(getArticleExcerpt(article, 300))}</description>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Olkeri ${escapeXml(copy.news.brand)}</title>
    <link>${BASE_URL}/${locale}</link>
    <atom:link href="${BASE_URL}/${locale}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(copy.news.tagline)}</description>
    <language>${locale}</language>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=900, stale-while-revalidate=3600',
    },
  })
}
