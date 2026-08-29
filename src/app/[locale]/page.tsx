import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import NewsCard from '@/components/NewsCard'
import {
  appCopy,
  articleLanguages,
  isArticleLanguage,
  type ArticleLanguage,
} from '@/lib/articles'
import { getLatestArticles, getMostReadArticles, NEWS_PAGE_SIZE } from '@/lib/news'

export const revalidate = 300

type LocalePageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({
  params,
}: Pick<LocalePageProps, 'params'>): Promise<Metadata> {
  const { locale } = await params

  if (!isArticleLanguage(locale)) return {}

  const copy = appCopy[locale]

  return {
    title: `Olkeri ${copy.news.brand}`,
    description: copy.news.tagline,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
        de: '/de',
        es: '/es',
        'x-default': '/en',
      },
    },
  }
}

export default async function LocalePage({ params, searchParams }: LocalePageProps) {
  const [{ locale }, { page: pageParam }] = await Promise.all([params, searchParams])

  if (!isArticleLanguage(locale)) {
    notFound()
  }

  const language = locale as ArticleLanguage
  const copy = appCopy[language]
  const page = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1)
  const offset = (page - 1) * NEWS_PAGE_SIZE

  const [latestPlusOne, mostRead] = await Promise.all([
    getLatestArticles(language, NEWS_PAGE_SIZE + 1, offset),
    page === 1 ? getMostReadArticles(language, 4) : Promise.resolve([]),
  ])

  const hasOlder = latestPlusOne.length > NEWS_PAGE_SIZE
  const latest = latestPlusOne.slice(0, NEWS_PAGE_SIZE)
  const featured = page === 1 ? latest[0] : undefined
  const gridArticles = page === 1 ? latest.slice(1) : latest
  const mostReadFiltered = mostRead.filter(article => article.id !== featured?.id)

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-5 pb-20 pt-32 text-white transition-colors sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-green-300/80">
              Olkeri · {copy.news.brand}
            </p>
            <h1 className="mt-3 text-4xl font-medium leading-tight sm:text-6xl">
              {copy.news.latest}
            </h1>
            <p className="mt-3 max-w-xl text-white/60">{copy.news.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {articleLanguages.map(option => (
              <Link
                key={option.code}
                href={`/${option.code}`}
                className={`rounded-md px-4 py-2 text-sm transition-colors ${
                  option.code === language
                    ? 'bg-green-400 text-black'
                    : 'border border-white/15 text-white/65 hover:bg-white/10'
                }`}
              >
                {option.name}
              </Link>
            ))}
          </div>
        </div>

        {latest.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-black/35 p-8">
            <p className="text-white/60">{copy.noArticles}</p>
          </div>
        ) : (
          <div className="space-y-14">
            {featured ? (
              <section>
                <SectionTitle>{copy.news.topStory}</SectionTitle>
                <NewsCard article={featured} appLanguage={language} variant="featured" />
              </section>
            ) : null}

            {mostReadFiltered.length > 0 ? (
              <section>
                <SectionTitle>{copy.news.mostRead}</SectionTitle>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {mostReadFiltered.map(article => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      appLanguage={language}
                      variant="compact"
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {gridArticles.length > 0 ? (
              <section>
                <SectionTitle>{copy.news.moreNews}</SectionTitle>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {gridArticles.map(article => (
                    <NewsCard key={article.id} article={article} appLanguage={language} />
                  ))}
                </div>
              </section>
            ) : null}

            {(page > 1 || hasOlder) && (
              <nav className="flex items-center justify-between border-t border-white/10 pt-8 text-sm">
                {page > 1 ? (
                  <Link
                    href={page === 2 ? `/${language}` : `/${language}?page=${page - 1}`}
                    className="rounded-md border border-white/15 px-4 py-2 text-white/70 transition-colors hover:bg-white/10"
                  >
                    ← {copy.news.newer}
                  </Link>
                ) : (
                  <span />
                )}
                {hasOlder ? (
                  <Link
                    href={`/${language}?page=${page + 1}`}
                    className="rounded-md border border-white/15 px-4 py-2 text-white/70 transition-colors hover:bg-white/10"
                  >
                    {copy.news.older} →
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-green-300/80">
      <span className="h-px w-8 bg-green-400/50" />
      {children}
    </h2>
  )
}
