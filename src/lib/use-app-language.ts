'use client'

import { useEffect, useState } from 'react'
import { isArticleLanguage, type ArticleLanguage } from '@/lib/articles'

const STORAGE_KEY = 'olkeri-language'

export function getStoredAppLanguage(fallback: ArticleLanguage = 'en') {
  if (typeof window === 'undefined') return fallback

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY)
  if (storedLanguage && isArticleLanguage(storedLanguage)) {
    return storedLanguage
  }

  const documentLanguage = document.documentElement.lang
  if (isArticleLanguage(documentLanguage)) {
    return documentLanguage
  }

  return fallback
}

export function setStoredAppLanguage(language: ArticleLanguage) {
  window.localStorage.setItem(STORAGE_KEY, language)
  document.documentElement.lang = language
  document.documentElement.dataset.language = language
  window.dispatchEvent(
    new CustomEvent('olkeri-language-change', { detail: language })
  )
}

export function useAppLanguage(fallback: ArticleLanguage = 'en') {
  const [language, setLanguage] = useState<ArticleLanguage>(fallback)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextLanguage = getStoredAppLanguage(fallback)
      setLanguage(nextLanguage)
      document.documentElement.lang = nextLanguage
      document.documentElement.dataset.language = nextLanguage
    }, 0)

    function handleLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<ArticleLanguage>
      setLanguage(customEvent.detail)
    }

    window.addEventListener('olkeri-language-change', handleLanguageChange)

    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('olkeri-language-change', handleLanguageChange)
    }
  }, [fallback])

  return language
}
