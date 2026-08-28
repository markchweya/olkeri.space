'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAppLanguage } from '@/lib/use-app-language'

// The old mixed-language listing is gone: /blog forwards to the news
// front page in the reader's chosen language (/en, /fr or /de).
export default function BlogPage() {
  const appLanguage = useAppLanguage()
  const router = useRouter()

  useEffect(() => {
    router.replace(`/${appLanguage}`)
  }, [appLanguage, router])

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)]" />
  )
}
