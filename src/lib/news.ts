import { cache } from 'react'

import type { Article, ArticleLanguage } from '@/lib/articles'
import { dbQuery } from '@/lib/db'

export const NEWS_PAGE_SIZE = 24

export const getArticleBySlug = cache(
  async (language: ArticleLanguage, slug: string): Promise<Article | null> => {
    const rows = await dbQuery<Article>(
      'select * from articles where language = $1 and slug = $2 limit 1',
      [language, slug]
    )

    return rows?.[0] ?? null
  }
)

export const getLatestArticles = cache(
  async (
    language: ArticleLanguage,
    limit = NEWS_PAGE_SIZE,
    offset = 0
  ): Promise<Article[]> => {
    const rows = await dbQuery<Article>(
      `select * from articles
       where language = $1 and published_at is not null
       order by published_at desc
       limit $2 offset $3`,
      [language, limit, offset]
    )

    return rows ?? []
  }
)

export const getMostReadArticles = cache(
  async (language: ArticleLanguage, limit = 6): Promise<Article[]> => {
    const rows = await dbQuery<Article>(
      `select * from articles
       where language = $1 and published_at is not null
       order by views desc, published_at desc
       limit $2`,
      [language, limit]
    )

    return rows ?? []
  }
)

// Other language versions of the same story, via translation_group_id.
export const getArticleTranslations = cache(
  async (article: Article): Promise<Article[]> => {
    if (!article.translation_group_id) return []

    const rows = await dbQuery<Article>(
      `select * from articles
       where translation_group_id = $1 and id <> $2 and published_at is not null`,
      [article.translation_group_id, article.id]
    )

    return rows ?? []
  }
)

export async function getSitemapArticles(limit = 5000) {
  const rows = await dbQuery<
    Pick<Article, 'slug' | 'language' | 'updated_at' | 'published_at'>
  >(
    `select slug, language, updated_at, published_at from articles
     where published_at is not null
     order by published_at desc
     limit $1`,
    [limit]
  )

  return rows ?? []
}

// Fire-and-forget view counter; failures never affect the page.
export async function incrementArticleViews(articleId: string) {
  await dbQuery('update articles set views = views + 1 where id = $1', [articleId])
}
