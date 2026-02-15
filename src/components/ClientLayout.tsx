'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import IntroAnimation from '@/components/IntroAnimation'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      {showIntro && <IntroAnimation onFinish={() => setShowIntro(false)} />}
      <Header />
      {!showIntro && children}
    </>
  )
}
