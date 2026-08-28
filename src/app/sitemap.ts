import type { MetadataRoute } from 'next'

import { articleLanguages } from '@/lib/articles'
import { getSupabase } from '@/lib/supabase'

export const revalidate = 3600

const BASE_URL = 'https://olkeri.space'

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

  const supabase = getSupabase()

  if (!supabase) return entries

  const { data } = await supabase
    .from('ai_articles')
    .select('slug,language,updated_at,published_at')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })
    .limit(5000)

  for (const article of data ?? []) {
    entries.push({
      url: `${BASE_URL}/${article.language}/${article.slug}`,
      lastModified: article.updated_at ?? article.published_at ?? undefined,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  return entries
}
