import type { Metadata } from 'next'
import Link from 'next/link'

import NewsCard from '@/components/NewsCard'
import StartProjectSection from '@/components/StartProjectSection'
import { appCopy, articleLanguages } from '@/lib/articles'
import { getLatestArticles, getMostReadArticles } from '@/lib/news'

export const revalidate = 300

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      fr: '/fr',
      de: '/de',
      es: '/es',
      'x-default': '/en',
    },
  },
}

export default async function Home() {
  const copy = appCopy.en
  const [latest, mostRead] = await Promise.all([
    getLatestArticles('en', 7),
    getMostReadArticles('en', 4),
  ])

  const featured = latest[0]
  const gridArticles = latest.slice(1)
  const mostReadFiltered = mostRead.filter(article => article.id !== featured?.id)

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] text-white">
      <section className="px-5 pb-16 pt-36 text-center sm:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-300/80">
            Olkeri · {copy.news.brand}
          </p>
          <h1 className="mt-6 bg-gradient-to-r from-white to-green-300 bg-clip-text text-5xl font-medium leading-tight text-transparent sm:text-7xl">
            {copy.home.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            {copy.home.sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/en"
              className="rounded-md bg-green-400 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-green-300"
            >
              {copy.home.ctaNews}
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
            >
              {copy.home.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="px-5 pb-16 sm:px-8">
          <div className="mx-auto max-w-6xl space-y-14">
            <div>
              <SectionTitle>{copy.home.topToday}</SectionTitle>
              <NewsCard article={featured} appLanguage="en" variant="featured" />
            </div>

            {mostReadFiltered.length > 0 ? (
              <div>
                <SectionTitle>{copy.news.mostRead}</SectionTitle>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {mostReadFiltered.map(article => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      appLanguage="en"
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {gridArticles.length > 0 ? (
              <div>
                <SectionTitle>{copy.news.latest}</SectionTitle>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {gridArticles.map(article => (
                    <NewsCard key={article.id} article={article} appLanguage="en" />
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link
                    href="/en"
                    className="inline-block rounded-md border border-white/20 px-6 py-3 text-sm text-white/80 transition-colors hover:bg-white/10"
                  >
                    {copy.news.moreNews} →
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle>{copy.home.editions}</SectionTitle>
          <div className="grid gap-5 md:grid-cols-3">
            {articleLanguages.map(language => (
              <Link
                key={language.code}
                href={`/${language.code}`}
                className="group rounded-lg border border-white/10 bg-black/40 p-6 transition-colors hover:border-green-400/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-300/75">
                  {language.code}
                </p>
                <h3 className="mt-2 text-2xl font-medium group-hover:text-green-400">
                  {language.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {appCopy[language.code].news.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StartProjectSection />
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
