import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleFallbackImage from '@/components/ArticleFallbackImage'
import {
  appCopy,
  getArticleParagraphs,
  getLanguageName,
  getReadTime,
  isArticleLanguage,
  type Article,
} from '@/lib/articles'
import { getSupabase } from '@/lib/supabase'

type ArticlePageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params

  if (!isArticleLanguage(locale)) {
    notFound()
  }

  const supabase = getSupabase()

  if (!supabase) {
    notFound()
  }

  const { data } = await supabase
    .from('ai_articles')
    .select('*')
    .eq('language', locale)
    .eq('slug', slug)
    .maybeSingle()

  const article = data as Article | null

  if (!article) {
    notFound()
  }

  const copy = appCopy[locale]
  const paragraphs = getArticleParagraphs(article.content)

  await supabase.rpc('increment_ai_article_views', {
    article_id: article.id,
  })

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-5 pb-20 pt-32 text-white sm:px-8">
      <article className="mx-auto max-w-4xl">
        <Link href={`/${locale}`} className="text-sm text-green-300 hover:text-green-200">
          Back to {getLanguageName(locale)} articles
        </Link>

        <div className="mt-8">
          <ArticleFallbackImage title={article.title} imageUrl={article.image_url} />
        </div>

        <p className="mt-8 text-sm text-green-300/75">
          {getLanguageName(article.language)} |{' '}
          {new Date(article.published_at ?? article.created_at).toLocaleDateString()} |{' '}
          {getReadTime(article.content, copy.readTimeSuffix)}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-tight sm:text-6xl">
          {article.title}
        </h1>
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
      </article>
    </main>
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
