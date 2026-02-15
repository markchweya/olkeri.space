'use client'

import { useEffect, useState } from 'react'

const FINAL_TEXT = "olkeri.space"
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export default function IntroAnimation({ onFinish }: { onFinish: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [display, setDisplay] = useState(FINAL_TEXT.split(''))
  const [done, setDone] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let frame = 0

    const interval = setInterval(() => {
      frame++

      setDisplay(
        FINAL_TEXT.split('').map((char, i) => {
          if (i < progress) return char
          return randomChar()
        })
      )

      if (frame % 3 === 0) {
        setProgress(prev => prev + 1)
      }

      if (progress >= FINAL_TEXT.length) {
        clearInterval(interval)
        setDone(true)
        setTimeout(() => {
          onFinish()
        }, 900)
      }
    }, 35)

    return () => clearInterval(interval)
  }, [mounted, progress, onFinish])

  if (!mounted) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black px-6 transition-opacity duration-700 ${
        done ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className="w-full text-center select-none"
        style={{
          fontSize: 'clamp(32px, 8vw, 110px)',
          lineHeight: 1.1,
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        {display.map((char, i) => {
          const gradientStart = 3
          const gradientEnd = 8

          let className = 'text-emerald-500/30'

          if (i < progress) {
            if (i < gradientStart) {
              className = 'text-white'
            } else if (i >= gradientStart && i <= gradientEnd) {
              className = 'bg-gradient-to-r from-white via-emerald-300 to-emerald-500 bg-clip-text text-transparent'
            } else {
              className = 'text-emerald-400'
            }
          }

          return (
            <span key={i} className={`transition-all duration-500 ${className}`}>
              {char}
            </span>
          )
        })}
      </div>
    </div>
  )
}
