'use client'

import { useEffect, useState } from 'react'

const FINAL_TEXT = "olkeri.space"
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export default function IntroAnimation({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0)
  const [display, setDisplay] = useState(FINAL_TEXT.split(''))
  const [done, setDone] = useState(false)

  useEffect(() => {
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
  }, [progress, onFinish])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        done ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-6xl md:text-8xl font-semibold tracking-tight font-mono">
        {display.map((char, i) => {
          // Gradient blend from white → emerald across eri + spa
          const gradientStart = 3
          const gradientEnd = 8

          let colorClass = 'text-emerald-500/30'

          if (i < progress) {
            if (i < gradientStart) {
              colorClass = 'text-white'
            } else if (i >= gradientStart && i <= gradientEnd) {
              colorClass = 'bg-gradient-to-r from-white via-emerald-300 to-emerald-500 bg-clip-text text-transparent'
            } else {
              colorClass = 'text-emerald-400'
            }
          }

          return (
            <span key={i} className={`transition-all duration-500 ${colorClass}`}>
              {char}
            </span>
          )
        })}
      </div>
    </div>
  )
}
