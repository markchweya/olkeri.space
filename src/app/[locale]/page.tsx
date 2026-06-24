import { notFound } from 'next/navigation'
import BlogListing from '@/components/BlogListing'
import { isArticleLanguage, type ArticleLanguage } from '@/lib/articles'

type LocalePageProps = {
  params: Promise<{ locale: string }>
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params

  if (!isArticleLanguage(locale)) {
    notFound()
  }

  return <BlogListing initialLanguage={locale as ArticleLanguage} />
}
