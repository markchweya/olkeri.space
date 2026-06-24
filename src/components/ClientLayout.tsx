'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import IntroAnimation from '@/components/IntroAnimation'
import CookieConsent from '@/components/CookieConsent'
import AccessibilityControls from '@/components/AccessibilityControls'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [showIntro, setShowIntro] = useState(true)
  const [showRouteIntro, setShowRouteIntro] = useState(false)
  const initialPathname = useRef(pathname)

  const finishIntro = useCallback(() => {
    setShowIntro(false)
  }, [])

  const finishRouteIntro = useCallback(() => {
    setShowRouteIntro(false)
  }, [])

  useEffect(() => {
    if (pathname === initialPathname.current) return

    const timeout = window.setTimeout(() => {
      setShowRouteIntro(true)
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [pathname])

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onFinish={finishIntro} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showIntro && showRouteIntro && (
          <IntroAnimation key={pathname} onFinish={finishRouteIntro} />
        )}
      </AnimatePresence>

      <Header />

      <AnimatePresence mode="wait">
        {!showIntro && (
          <motion.main
            key={pathname}
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
      <AccessibilityControls />
    </>
  )
}
