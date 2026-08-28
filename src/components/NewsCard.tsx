import Link from 'next/link'

import ArticleFallbackImage from '@/components/ArticleFallbackImage'
import {
  appCopy,
  formatArticleDate,
  getArticleExcerpt,
  getArticlePath,
  getCategoryLabel,
  getReadTime,
  getRegionLabel,
  type Article,
  type ArticleLanguage,
} from '@/lib/articles'

type NewsCardProps = {
  article: Article
  appLanguage: ArticleLanguage
  variant?: 'featured' | 'default' | 'compact'
}

export default function NewsCard({
  article,
  appLanguage,
  variant = 'default',
}: NewsCardProps) {
  const copy = appCopy[appLanguage]
  const category = getCategoryLabel(article.category, appLanguage)
  const region = getRegionLabel(article.region, appLanguage)

  if (variant === 'featured') {
    return (
      <Link
        href={getArticlePath(article)}
        className="group grid gap-6 overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl shadow-green-950/20 transition-transform hover:-translate-y-1 md:grid-cols-2"
      >
        <ArticleFallbackImage title={article.title} imageUrl={article.image_url} />
        <div className="flex flex-col justify-center p-6 md:p-8">
          <CardMeta
            category={category}
            region={region}
            date={formatArticleDate(article, appLanguage)}
          />
          <h2 className="mt-4 text-2xl font-medium leading-tight group-hover:text-green-400 sm:text-4xl">
            {article.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-white/62">
            {getArticleExcerpt(article, 240)}
          </p>
          <p className="mt-5 text-xs text-white/45">
            {getReadTime(article.content, copy.readTimeSuffix)}
          </p>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={getArticlePath(article)}
        className="group flex flex-col gap-2 rounded-lg border border-white/10 bg-black/40 p-5 transition-colors hover:border-green-400/40"
      >
        <CardMeta
          category={category}
          region={region}
          date={formatArticleDate(article, appLanguage)}
        />
        <h3 className="text-lg font-medium leading-snug group-hover:text-green-400">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-white/55">
          {getArticleExcerpt(article, 140)}
        </p>
      </Link>
    )
  }

  return (
    <Link
      href={getArticlePath(article)}
      className="group overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-2xl shadow-green-950/20 transition-transform hover:-translate-y-1"
    >
      <ArticleFallbackImage title={article.title} imageUrl={article.image_url} compact />
      <div className="p-5">
        <CardMeta
          category={category}
          region={region}
          date={formatArticleDate(article, appLanguage)}
        />
        <h3 className="mt-3 text-xl font-medium leading-snug group-hover:text-green-400">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/62">
          {getArticleExcerpt(article)}
        </p>
        <p className="mt-4 text-xs text-white/45">
          {getReadTime(article.content, copy.readTimeSuffix)}
        </p>
      </div>
    </Link>
  )
}

function CardMeta({
  category,
  region,
  date,
}: {
  category: string | null
  region: string | null
  date: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {category ? (
        <span className="rounded-full bg-green-400/10 px-2.5 py-0.5 font-medium text-green-300">
          {category}
        </span>
      ) : null}
      {region ? <span className="text-white/50">{region}</span> : null}
      <span className="text-white/40">{date}</span>
    </div>
  )
}
