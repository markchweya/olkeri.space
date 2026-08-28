'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { appCopy, isArticleLanguage } from '@/lib/articles'
import { useAppLanguage } from '@/lib/use-app-language'

export default function Header() {
  const pathname = usePathname()
  const pathLanguage = pathname.split('/')[1]
  const hasPathLanguage = isArticleLanguage(pathLanguage)
  const appLanguage = useAppLanguage(
    hasPathLanguage ? pathLanguage : 'en',
    hasPathLanguage
  )
  const copy = appCopy[appLanguage]

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-wide text-white">
            OLKERI
          </span>
          <span className="rounded bg-green-400/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-green-300">
            {copy.news.brand}
          </span>
        </Link>

        <nav className="flex items-center gap-6 sm:gap-10 text-sm font-medium">
          {pathname !== '/' && (
            <Link
              href="/"
              className="text-white hover:text-green-400 transition-colors duration-200"
            >
              {copy.navHome}
            </Link>
          )}

          {pathname !== `/${appLanguage}` && (
            <Link
              href={`/${appLanguage}`}
              className="text-white hover:text-green-400 transition-colors duration-200"
            >
              {copy.navBlog}
            </Link>
          )}

          {pathname !== '/contact' && (
            <Link
              href="/contact"
              className="text-white hover:text-green-400 transition-colors duration-200"
            >
              {copy.navContact}
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
