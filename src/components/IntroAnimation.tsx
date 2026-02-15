'use client'

import { useEffect, useState } from 'react'

export default function IntroAnimation({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true)
  const [spin, setSpin] = useState(false)
  const [showSpace, setShowSpace] = useState(false)

  useEffect(() => {
    const spinTimer = setTimeout(() => setSpin(true), 300)
    const spaceTimer = setTimeout(() => setShowSpace(true), 1200)
    const endTimer = setTimeout(() => {
      setVisible(false)
      onFinish()
    }, 2500)

    return () => {
      clearTimeout(spinTimer)
      clearTimeout(spaceTimer)
      clearTimeout(endTimer)
    }
  }, [onFinish])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="text-6xl md:text-8xl font-bold tracking-wide flex items-center gap-2">
        {/* Correct order: o + lkeri */}
        <span
          className={`text-green-400 inline-block transition-transform duration-1000 ${
            spin ? 'rotate-[720deg]' : ''
          }`}
        >
          o
        </span>
        <span className="text-gray-300">lkeri</span>
        <span
          className={`text-green-400 transition-all duration-1000 ${
            showSpace ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          .space
        </span>
      </div>
    </div>
  )
}
