import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ArticleFallbackImage from '@/components/ArticleFallbackImage'
import NewsCard from '@/components/NewsCard'
import {
  appCopy,
  formatArticleDate,
  getArticleAuthor,
  getArticleExcerpt,
  getArticleParagraphs,
  getArticlePath,
  getCategoryLabel,
  getLanguageName,
  getReadTime,
  getRegionLabel,
  isArticleLanguage,
  type ArticleLanguage,
} from '@/lib/articles'
import {
  getArticleBySlug,
  getArticleTranslations,
  getLatestArticles,
  getMostReadArticles,
  incrementArticleViews,
} from '@/lib/news'

type ArticlePageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params

  if (!isArticleLanguage(locale)) return {}

  const article = await getArticleBySlug(locale, slug)

  if (!article) return {}

  const translations = await getArticleTranslations(article)
  const languages: Record<string, string> = {
    [article.language]: getArticlePath(article),
  }

  for (const translation of translations) {
    languages[translation.language] = getArticlePath(translation)
  }

  const description = getArticleExcerpt(article, 160)

  return {
    title: article.title,
    description,
    alternates: {
      canonical: getArticlePath(article),
      languages,
    },
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      publishedTime: article.published_at ?? undefined,
      images: [article.image_url ?? '/og-default.png'],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params

  if (!isArticleLanguage(locale)) {
    notFound()
  }

  const language = locale as ArticleLanguage
  const article = await getArticleBySlug(language, slug)

  if (!article) {
    notFound()
  }

  const copy = appCopy[language]
  const paragraphs = getArticleParagraphs(article.content)
  const category = getCategoryLabel(article.category, language)
  const region = getRegionLabel(article.region, language)

  const [translations, mostRead, latest] = await Promise.all([
    getArticleTranslations(article),
    getMostReadArticles(language, 5),
    getLatestArticles(language, 7),
  ])

  await incrementArticleViews(article.id)

  const mostReadOther = mostRead
    .filter(other => other.id !== article.id)
    .slice(0, 4)
  const latestOther = latest
    .filter(
      other =>
        other.id !== article.id &&
        !mostReadOther.some(candidate => candidate.id === other.id)
    )
    .slice(0, 6)

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-5 pb-20 pt-32 text-white sm:px-8">
      <article className="mx-auto max-w-4xl">
        <Link href={`/${language}`} className="text-sm text-green-300 hover:text-green-200">
          ← {copy.news.backToNews}
        </Link>

        <div className="mt-8">
          <ArticleFallbackImage title={article.title} imageUrl={article.image_url} />
          {article.image_credit ? (
            <p className="mt-2 text-xs text-white/40">
              {copy.news.imageCredit}: {article.image_credit}
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-green-300/75">
          {category ? (
            <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-medium text-green-300">
              {category}
            </span>
          ) : null}
          {region ? <span className="text-white/55">{region}</span> : null}
          <span>{formatArticleDate(article, language)}</span>
          <span>{getReadTime(article.content, copy.readTimeSuffix)}</span>
        </div>

        <p className="mt-3 text-sm text-white/60">
          {copy.news.byline}{' '}
          <span className="text-white/85">{getArticleAuthor(article)}</span>
        </p>

        <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-tight sm:text-6xl">
          {article.title}
        </h1>

        {article.summary ? (
          <p className="mt-6 max-w-3xl text-xl leading-9 text-white/70">
            {article.summary}
          </p>
        ) : null}

        {translations.length > 0 ? (
          <p className="mt-6 text-sm text-white/55">
            {copy.news.readIn}:{' '}
            {translations.map((translation, index) => (
              <span key={translation.id}>
                {index > 0 ? ' · ' : null}
                <Link
                  href={getArticlePath(translation)}
                  className="text-green-300 hover:text-green-200"
                >
                  {getLanguageName(translation.language)}
                </Link>
              </span>
            ))}
          </p>
        ) : null}

        <div className="mt-10 max-w-3xl space-y-8 text-[1.05rem] leading-9 text-white/78 sm:text-lg sm:leading-10">
          {paragraphs.map((paragraph, index) =>
            isArticleSectionHeading(paragraph) ? (
              <h2
                key={index}
                className="pt-4 text-2xl font-medium leading-tight text-white sm:text-3xl"
              >
                {paragraph}
              </h2>
            ) : (
              <p
                key={index}
                className={`whitespace-pre-line ${
                  index === 0 ? 'text-white/88' : ''
                }`}
              >
                {paragraph}
              </p>
            )
          )}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsArticle',
              headline: article.title,
              description: getArticleExcerpt(article, 200),
              image: [article.image_url ?? 'https://www.olkeri.space/og-default.png'],
              datePublished: article.published_at ?? article.created_at,
              dateModified: article.updated_at ?? article.published_at ?? article.created_at,
              inLanguage: article.language,
              author: {
                '@type': 'Organization',
                name: getArticleAuthor(article),
                url: 'https://www.olkeri.space',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Olkeri',
                url: 'https://www.olkeri.space',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.olkeri.space/og-default.png',
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://www.olkeri.space${getArticlePath(article)}`,
              },
            }),
          }}
        />

        {article.source_url ? (
          <p className="mt-10 max-w-3xl border-t border-white/10 pt-6 text-sm text-white/55">
            {copy.news.source}:{' '}
            <a
              href={article.source_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-green-300 hover:text-green-200"
            >
              {article.source_name || new URL(article.source_url).hostname}
            </a>
          </p>
        ) : null}
      </article>

      {(mostReadOther.length > 0 || latestOther.length > 0) && (
        <aside className="mx-auto mt-20 max-w-6xl border-t border-white/10 pt-14">
          {mostReadOther.length > 0 ? (
            <section>
              <SectionTitle>{copy.news.mostRead}</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {mostReadOther.map(other => (
                  <NewsCard
                    key={other.id}
                    article={other}
                    appLanguage={language}
                    variant="compact"
                  />
                ))}
              </div>
            </section>
          ) : null}

          {latestOther.length > 0 ? (
            <section className="mt-14">
              <SectionTitle>{copy.news.moreNews}</SectionTitle>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {latestOther.map(other => (
                  <NewsCard key={other.id} article={other} appLanguage={language} />
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      )}
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

function isArticleSectionHeading(paragraph: string) {
  const trimmed = paragraph.trim()

  return (
    trimmed.length <= 90 &&
    !trimmed.includes('\n') &&
    !trimmed.endsWith('.') &&
    /[?:]$/.test(trimmed)
  )
}
