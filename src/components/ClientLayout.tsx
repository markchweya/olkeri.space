'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/Header'
import IntroAnimation from '@/components/IntroAnimation'
import CookieConsent from '@/components/CookieConsent'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onFinish={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <Header />

      <AnimatePresence mode="wait">
        {!showIntro && (
          <motion.main
            key="page"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {children}
          </motion.main>
        )}
      </AnimatePresence>

      <CookieConsent />
    </>
  )
}
