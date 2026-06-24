'use client'

import { useEffect, useState } from 'react'
import { appCopy } from '@/lib/articles'
import { useAppLanguage } from '@/lib/use-app-language'

type ContactForm = {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
  const appLanguage = useAppLanguage()
  const copy = appCopy[appLanguage].contact
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  })

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setMounted(true)
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-6 py-32 text-white">
      <div
        className={`mx-auto w-full max-w-3xl transition-all duration-700 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <h1 className="bg-gradient-to-r from-white to-green-300 bg-clip-text text-5xl font-medium leading-tight text-transparent sm:text-7xl">
          {copy.title}
        </h1>

        <p className="mt-8 text-base leading-7 text-white/72 sm:text-lg">
          {copy.intro}
        </p>

        <form className="mt-12 space-y-6">
          <input
            placeholder={copy.name}
            type="text"
            value={form.name}
            onChange={event =>
              setForm(current => ({ ...current, name: event.target.value }))
            }
            className="w-full rounded-lg border border-green-400/30 bg-black/50 px-5 py-4 text-white outline-none transition-colors focus:border-green-400"
          />

          <input
            placeholder={copy.email}
            type="email"
            value={form.email}
            onChange={event =>
              setForm(current => ({ ...current, email: event.target.value }))
            }
            className="w-full rounded-lg border border-green-400/30 bg-black/50 px-5 py-4 text-white outline-none transition-colors focus:border-green-400"
          />

          <textarea
            placeholder={copy.message}
            rows={6}
            value={form.message}
            onChange={event =>
              setForm(current => ({ ...current, message: event.target.value }))
            }
            className="w-full resize-none rounded-lg border border-green-400/30 bg-black/50 px-5 py-4 text-white outline-none transition-colors focus:border-green-400"
          />

          <button
            type="button"
            className="rounded-lg bg-gradient-to-r from-green-400 to-green-500 px-6 py-4 font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            {copy.submit}
          </button>
        </form>
      </div>
    </main>
  )
}
