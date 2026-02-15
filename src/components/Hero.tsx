'use client'

import { useState, useEffect } from 'react'
import CodeBackground from './CodeBackground'

export default function Hero() {
  const [opacity, setOpacity] = useState(1)
  const [translate, setTranslate] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const fadeStart = 0
      const fadeEnd = window.innerHeight * 0.6

      const progress = Math.min(scrollY / fadeEnd, 1)
      setOpacity(1 - progress)
      setTranslate(progress * 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'black',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Code Background Restored */}
      <CodeBackground />

      {/* Brand */}
      <h1
        style={{
          position: 'relative',
          zIndex: 2,
          fontSize: 'clamp(64px, 7vw, 110px)',
          fontWeight: 500,
          letterSpacing: '0.01em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.02em',
          textTransform: 'lowercase',
          opacity,
          transform: `translateY(-${translate}px)`,
          transition: 'opacity 0.1s linear',
        }}
      >
        <span
          style={{
            color: '#e6f1ee',
            letterSpacing: '0.12em',
          }}
        >
          olkeri
        </span>
        <span
          style={{
            color: '#00ff9d',
            letterSpacing: '0.22em',
          }}
        >
          .space
        </span>
      </h1>
    </div>
  )
}
