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


    </div>
  )
}
