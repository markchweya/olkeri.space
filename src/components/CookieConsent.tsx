'use client'

import { useEffect, useState } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] w-[90%] max-w-xl bg-neutral-900 border border-emerald-500/30 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-gray-300">
          We use cookies to enhance your experience and analyze performance.
        </p>
        <button
          onClick={accept}
          className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-medium transition-colors duration-200"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
