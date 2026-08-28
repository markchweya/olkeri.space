import { cache } from 'react'

import type { Article, ArticleLanguage } from '@/lib/articles'
import { getSupabase } from '@/lib/supabase'

export const NEWS_PAGE_SIZE = 24

export const getArticleBySlug = cache(
  async (language: ArticleLanguage, slug: string): Promise<Article | null> => {
    const supabase = getSupabase()
    if (!supabase) return null

    const { data } = await supabase
      .from('ai_articles')
      .select('*')
      .eq('language', language)
      .eq('slug', slug)
      .maybeSingle()

    return (data as Article | null) ?? null
  }
)

export const getLatestArticles = cache(
  async (
    language: ArticleLanguage,
    limit = NEWS_PAGE_SIZE,
    offset = 0
  ): Promise<Article[]> => {
    const supabase = getSupabase()
    if (!supabase) return []

    const { data } = await supabase
      .from('ai_articles')
      .select('*')
      .eq('language', language)
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    return (data ?? []) as Article[]
  }
)

export const getMostReadArticles = cache(
  async (language: ArticleLanguage, limit = 6): Promise<Article[]> => {
    const supabase = getSupabase()
    if (!supabase) return []

    const { data } = await supabase
      .from('ai_articles')
      .select('*')
      .eq('language', language)
      .not('published_at', 'is', null)
      .order('views', { ascending: false, nullsFirst: false })
      .order('published_at', { ascending: false })
      .limit(limit)

    return (data ?? []) as Article[]
  }
)

// Other language versions of the same story, via translation_group_id.
// Returns [] until the news schema upgrade has been applied.
export const getArticleTranslations = cache(
  async (article: Article): Promise<Article[]> => {
    if (!article.translation_group_id) return []

    const supabase = getSupabase()
    if (!supabase) return []

    const { data, error } = await supabase
      .from('ai_articles')
      .select('*')
      .eq('translation_group_id', article.translation_group_id)
      .neq('id', article.id)
      .not('published_at', 'is', null)

    if (error) return []

    return (data ?? []) as Article[]
  }
)
