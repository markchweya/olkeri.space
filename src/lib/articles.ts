export const articleLanguages = [
  { code: 'en', label: 'English', name: 'English' },
  { code: 'fr', label: 'French', name: 'Francais' },
  { code: 'de', label: 'German', name: 'Deutsch' },
] as const

export type ArticleLanguage = (typeof articleLanguages)[number]['code']

export type Article = {
  id: string
  title: string
  slug: string
  content: string
  language: ArticleLanguage
  image_url: string | null
  created_at: string
  updated_at: string
  published_at: string | null
}

export function getReadTime(content: string) {
  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 220))

  return `${minutes} min read`
}

export function isArticleLanguage(value: string): value is ArticleLanguage {
  return articleLanguages.some(language => language.code === value)
}

export function getLanguageName(code: ArticleLanguage) {
  return articleLanguages.find(language => language.code === code)?.name ?? code
}

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getArticlePath(article: Pick<Article, 'language' | 'slug'>) {
  return `/${article.language}/${article.slug}`
}
