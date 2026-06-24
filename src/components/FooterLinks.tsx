'use client'

import Link from 'next/link'
import { articleLanguages, appCopy } from '@/lib/articles'
import { legalNavItems } from '@/lib/legal-pages'
import { useAppLanguage } from '@/lib/use-app-language'

const legalLabelKeys = ['privacy', 'terms', 'cookies', 'disclaimer', 'editorial', 'dmca'] as const

export default function FooterLinks() {
  const appLanguage = useAppLanguage()
  const copy = appCopy[appLanguage]

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-white/60">
      <Link href="/blog" className="hover:text-green-400 transition-colors">
        {copy.footerArticles}
      </Link>
      {articleLanguages.map(language => (
        <Link
          key={language.code}
          href={`/${language.code}`}
          className="hover:text-green-400 transition-colors"
        >
          {language.code.toUpperCase()}
        </Link>
      ))}
      {legalNavItems.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className="hover:text-green-400 transition-colors"
        >
          {copy.legalLabels[legalLabelKeys[index]]}
        </Link>
      ))}
    </div>
  )
}
