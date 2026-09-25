import type { Metadata } from 'next'
import Link from 'next/link'

import NewsCard from '@/components/NewsCard'
import ProjectCard from '@/components/ProjectCard'
import StartProjectSection from '@/components/StartProjectSection'
import { appCopy } from '@/lib/articles'
import { getLatestArticles } from '@/lib/news'
import { featuredProjects } from '@/lib/projects'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Olkeri — Mobile apps, web solutions, AI and data science',
  description:
    'Olkeri is a software studio building mobile apps, web platforms, AI systems and data science tools — and a newsroom covering artificial intelligence in four languages.',
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

// The landing page is served in English; the localized front pages are the
// newsroom routes at /en, /fr, /de and /es.
const copy = appCopy.en

export default async function Home() {
  const latest = await getLatestArticles('en', 3)

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] text-white">
      <section className="px-5 pb-20 pt-36 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-300/80">
            Olkeri · {copy.studio.eyebrow}
          </p>
          <h1 className="mt-6 bg-gradient-to-r from-white to-green-300 bg-clip-text text-5xl font-medium leading-tight text-transparent sm:text-7xl">
            {copy.studio.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            {copy.studio.sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-md bg-green-400 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-green-300"
            >
              {copy.studio.ctaContact}
            </Link>
            <Link
              href="/work"
              className="rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
            >
              {copy.studio.ctaWork}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle>{copy.studio.servicesTitle}</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.studio.services.map(service => (
              <div
                key={service.title}
                className="rounded-lg border border-white/10 bg-black/40 p-6 transition-colors hover:border-green-400/40"
              >
                <h3 className="text-lg font-medium text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{service.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle>{copy.studio.workTitle}</SectionTitle>
          <p className="-mt-2 mb-8 max-w-2xl text-sm leading-6 text-white/55">
            {copy.studio.workSub}
          </p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map(project => (
              <ProjectCard
                key={project.slug}
                project={project}
                labels={{
                  privateLabel: copy.studio.privateLabel,
                  viewCode: copy.studio.viewCode,
                  category: copy.studio.cats[project.category],
                }}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/work"
              className="inline-block rounded-md border border-white/20 px-6 py-3 text-sm text-white/80 transition-colors hover:bg-white/10"
            >
              {copy.studio.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {latest.length > 0 ? (
        <section className="px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionTitle>{copy.studio.blogTitle}</SectionTitle>
            <p className="-mt-2 mb-8 max-w-2xl text-sm leading-6 text-white/55">
              {copy.studio.blogSub}
            </p>
            <div className="grid gap-5 md:grid-cols-3">
              {latest.map(article => (
                <NewsCard key={article.id} article={article} appLanguage="en" />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/en"
                className="inline-block rounded-md border border-white/20 px-6 py-3 text-sm text-white/80 transition-colors hover:bg-white/10"
              >
                {copy.studio.readBlog} →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

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
