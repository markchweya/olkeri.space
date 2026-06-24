'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import ArticleFallbackImage from '@/components/ArticleFallbackImage'
import {
  articleLanguages,
  getArticlePath,
  getLanguageName,
  getReadTime,
  type Article,
  type ArticleLanguage,
} from '@/lib/articles'
import { getSupabase } from '@/lib/supabase'

type BlogListingProps = {
  initialLanguage?: ArticleLanguage
}

export default function BlogListing({ initialLanguage }: BlogListingProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<ArticleLanguage | 'all'>(
    initialLanguage ?? 'all'
  )
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadArticles() {
      setLoading(true)
      const supabase = getSupabase()
      if (!supabase) {
        setArticles([])
        setLoading(false)
        return
      }

      let query = supabase
        .from('ai_articles')
        .select('*')
        .order('published_at', { ascending: false })

      if (selectedLanguage !== 'all') {
        query = query.eq('language', selectedLanguage)
      }

      const { data } = await query

      if (!cancelled) {
        setArticles((data ?? []) as Article[])
        setLoading(false)
      }
    }

    loadArticles()

    return () => {
      cancelled = true
    }
  }, [selectedLanguage])

  const pageTitle = useMemo(() => {
    if (selectedLanguage === 'all') return 'AI Articles'
    return `${getLanguageName(selectedLanguage)} AI Articles`
  }, [selectedLanguage])

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-5 pb-20 pt-32 text-white transition-colors sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-green-300/80">
              aimploy.olkeri.space
            </p>
            <h1 className="mt-3 text-4xl font-medium leading-tight sm:text-6xl">
              {pageTitle}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/blog"
              onClick={() => setSelectedLanguage('all')}
              className={`rounded-md px-4 py-2 text-sm transition-colors ${
                selectedLanguage === 'all'
                  ? 'bg-green-400 text-black'
                  : 'border border-white/15 text-white/65 hover:bg-white/10'
              }`}
            >
              All
            </Link>

            {articleLanguages.map(language => (
              <Link
                key={language.code}
                href={`/${language.code}`}
                onClick={() => setSelectedLanguage(language.code)}
                className={`rounded-md px-4 py-2 text-sm transition-colors ${
                  selectedLanguage === language.code
                    ? 'bg-green-400 text-black'
                    : 'border border-white/15 text-white/65 hover:bg-white/10'
                }`}
              >
                {language.label}
              </Link>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-white/60">
            Loading articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-black/35 p-8">
            <p className="text-white/60">
              No articles have been published for this view yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map(article => (
              <Link
                key={article.id}
                href={getArticlePath(article)}
                className="group overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-2xl shadow-green-950/20 transition-transform hover:-translate-y-1"
              >
                <ArticleFallbackImage
                  title={article.title}
                  imageUrl={article.image_url}
                  compact
                />
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3 text-xs">
                    <span className="text-green-300/75">
                      {getLanguageName(article.language)}
                    </span>
                    <span className="text-white/45">
                      {getReadTime(article.content)}
                    </span>
                  </div>
                  <p className="mb-3 text-xs text-white/45">
                    {new Date(article.published_at ?? article.created_at).toLocaleDateString()}
                  </p>
                  <h2 className="text-xl font-medium leading-snug group-hover:text-green-400">
                    {article.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/62">
                    {article.content}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
