'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
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

  // True on the client, false while server-rendering — read through
  // useSyncExternalStore so it is hydration-safe without setting state in an
  // effect. Used only to decide whether the content wrapper needs an entry
  // animation; see the comment on <motion.main> below.
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

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

      {/*
        The page content renders on every pass, including on the server.
        It used to be withheld until the intro animation finished, which meant
        no page shipped any content in its HTML — the whole site, articles
        included, was invisible to anything that does not execute JavaScript.
        The intro is an opaque fixed overlay at z-9999, so rendering beneath it
        changes nothing a visitor sees.

        `initial` is skipped until the component has mounted so the server
        never emits an opacity-0 wrapper around the content; route changes
        after that animate as before.
      */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={hasMounted ? { opacity: 0, y: 30, scale: 0.98 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <CookieConsent />
      <AccessibilityControls />
    </>
  )
}
