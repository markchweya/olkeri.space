import type { MetadataRoute } from 'next'

import { articleLanguages } from '@/lib/articles'
import { getSitemapArticles } from '@/lib/news'

export const revalidate = 3600

const BASE_URL = 'https://www.olkeri.space'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: 'hourly',
      priority: 1,
    },
    ...articleLanguages.map(language => ({
      url: `${BASE_URL}/${language.code}`,
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    })),
  ]

  const articles = await getSitemapArticles(5000)

  for (const article of articles) {
    entries.push({
      url: `${BASE_URL}/${article.language}/${article.slug}`,
      lastModified: article.updated_at ?? article.published_at ?? undefined,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  return entries
}
