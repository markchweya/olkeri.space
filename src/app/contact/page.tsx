'use client'

import { useEffect, useState } from 'react'
import { appCopy } from '@/lib/articles'
import { useAppLanguage } from '@/lib/use-app-language'

type ContactForm = {
  name: string
  email: string
  message: string
  topic: string
  company: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const CONTACT_EMAIL = 'chweyahub@gmail.com'

const emptyForm: ContactForm = {
  name: '',
  email: '',
  message: '',
  topic: 'project',
  company: '',
}

export default function ContactPage() {
  const appLanguage = useAppLanguage()
  const copy = appCopy[appLanguage].contact
  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState<ContactForm>(emptyForm)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setMounted(true)
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, language: appLanguage }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        setErrorMessage(body?.error || copy.error)
        setStatus('error')
        return
      }

      setForm(emptyForm)
      setStatus('sent')
    } catch {
      setErrorMessage(copy.error)
      setStatus('error')
    }
  }

  const disabled = status === 'sending'

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

        <p className="mt-8 text-base leading-7 text-white/72 sm:text-lg">{copy.intro}</p>

        {status === 'sent' ? (
          <div
            role="status"
            className="mt-12 rounded-lg border border-green-400/40 bg-green-400/10 px-6 py-5 text-green-100"
          >
            {copy.success}
          </div>
        ) : (
          <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
            <fieldset>
              <legend className="mb-3 text-sm text-white/60">{copy.topicLabel}</legend>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['project', copy.topicProject],
                    ['newsroom', copy.topicNewsroom],
                    ['other', copy.topicOther],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className={`cursor-pointer rounded-md border px-4 py-2 text-sm transition-colors ${
                      form.topic === value
                        ? 'border-green-400 bg-green-400/15 text-green-200'
                        : 'border-white/15 text-white/65 hover:border-white/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={value}
                      checked={form.topic === value}
                      onChange={() => setForm(current => ({ ...current, topic: value }))}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <input
              placeholder={copy.name}
              type="text"
              required
              value={form.name}
              onChange={event =>
                setForm(current => ({ ...current, name: event.target.value }))
              }
              className="w-full rounded-lg border border-green-400/30 bg-black/50 px-5 py-4 text-white outline-none transition-colors focus:border-green-400"
            />

            <input
              placeholder={copy.email}
              type="email"
              required
              value={form.email}
              onChange={event =>
                setForm(current => ({ ...current, email: event.target.value }))
              }
              className="w-full rounded-lg border border-green-400/30 bg-black/50 px-5 py-4 text-white outline-none transition-colors focus:border-green-400"
            />

            <textarea
              placeholder={copy.message}
              rows={6}
              required
              minLength={10}
              value={form.message}
              onChange={event =>
                setForm(current => ({ ...current, message: event.target.value }))
              }
              className="w-full resize-none rounded-lg border border-green-400/30 bg-black/50 px-5 py-4 text-white outline-none transition-colors focus:border-green-400"
            />

            {/* Honeypot: hidden from people, tempting to bots. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.company}
              onChange={event =>
                setForm(current => ({ ...current, company: event.target.value }))
              }
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {status === 'error' ? (
              <p role="alert" className="text-sm text-red-300">
                {errorMessage || copy.error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={disabled}
              className="rounded-lg bg-gradient-to-r from-green-400 to-green-500 px-6 py-4 font-semibold text-black transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {disabled ? copy.sending : copy.submit}
            </button>
          </form>
        )}

        <p className="mt-10 text-sm text-white/50">
          {copy.emailFallback}{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-green-300 transition-colors hover:text-green-200"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </main>
  )
}
