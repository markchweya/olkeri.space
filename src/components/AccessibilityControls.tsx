'use client'

import { Moon, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { articleLanguages, isArticleLanguage, type ArticleLanguage } from '@/lib/articles'
import { setStoredAppLanguage, useAppLanguage } from '@/lib/use-app-language'

type ThemeMode = 'dark' | 'light'

export default function AccessibilityControls() {
  const pathname = usePathname()
  const pathLanguage = pathname.split('/')[1]
  const hasPathLanguage = isArticleLanguage(pathLanguage)
  const fallbackLanguage = hasPathLanguage ? pathLanguage : 'en'
  const appLanguage = useAppLanguage(fallbackLanguage, hasPathLanguage)
  const [theme, setTheme] = useState<ThemeMode>('dark')

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const storedTheme = window.localStorage.getItem('olkeri-theme') as ThemeMode | null
      const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark'
      const nextTheme = storedTheme ?? preferredTheme

      setTheme(nextTheme)
      document.documentElement.dataset.theme = nextTheme
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('olkeri-theme', nextTheme)
  }

  function changeLanguage(language: ArticleLanguage) {
    setStoredAppLanguage(language)
  }

  return (
    <div
      aria-label="Accessibility controls"
      className="fixed bottom-4 right-4 z-[80] flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-lg border border-white/10 bg-black/70 p-2 text-white shadow-2xl shadow-black/30 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-green-300 transition-colors hover:bg-white/10"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="h-6 w-px bg-white/15" />

      <div className="flex items-center gap-1" aria-label="Website language">
        {articleLanguages.map(language => (
          <button
            key={language.code}
            type="button"
            onClick={() => changeLanguage(language.code)}
            aria-pressed={appLanguage === language.code}
            aria-label={`Switch olkeri.space language to ${language.name}`}
            className={`rounded-md px-2.5 py-2 text-xs font-medium uppercase tracking-wide transition-colors hover:bg-white/10 hover:text-green-300 ${
              appLanguage === language.code ? 'text-green-300' : 'text-white/75'
            }`}
          >
            {language.code}
          </button>
        ))}
      </div>
    </div>
  )
}
