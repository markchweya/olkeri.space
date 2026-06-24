'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  articleLanguages,
  createSlug,
  getArticlePath,
  getLanguageName,
  getReadTime,
  type Article,
  type ArticleLanguage,
} from '@/lib/articles'
import { getSupabase } from '@/lib/supabase'

type ArticleForm = {
  title: string
  slug: string
  content: string
  language: ArticleLanguage
  imageUrl: string
}

const emptyForm: ArticleForm = {
  title: '',
  slug: '',
  content: '',
  language: 'en',
  imageUrl: '',
}

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [form, setForm] = useState<ArticleForm>(emptyForm)
  const [articles, setArticles] = useState<Article[]>([])
  const [query, setQuery] = useState('')
  const [languageFilter, setLanguageFilter] = useState<ArticleLanguage | 'all'>('all')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const loadArticles = useCallback(async () => {
    const supabase = getSupabase()
    if (!supabase) return

    const { data, error } = await supabase
      .from('ai_articles')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) {
      setMessage(error.message)
      return
    }

    setArticles((data ?? []) as Article[])
  }, [])

  useEffect(() => {
    let mounted = true

    async function loadSession() {
      const supabase = getSupabase()
      if (!supabase) {
        setAuthLoading(false)
        return
      }

      const { data } = await supabase.auth.getUser()
      if (mounted) {
        setUserId(data.user?.id ?? null)
        setAuthLoading(false)
      }
    }

    loadSession()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!userId) return

    const timeout = window.setTimeout(() => {
      loadArticles()
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [loadArticles, userId])

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return articles.filter(article => {
      const languageMatch =
        languageFilter === 'all' || article.language === languageFilter
      const queryMatch =
        !normalizedQuery ||
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.slug.toLowerCase().includes(normalizedQuery) ||
        article.content.toLowerCase().includes(normalizedQuery)

      return languageMatch && queryMatch
    })
  }, [articles, languageFilter, query])

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    const supabase = getSupabase()
    if (!supabase) {
      setMessage('Supabase is not configured.')
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    setUserId(data.user?.id ?? null)
    setPassword('')
    setMessage('Signed in.')
  }

  async function signOut() {
    const supabase = getSupabase()
    if (!supabase) return

    await supabase.auth.signOut()
    setUserId(null)
    setArticles([])
    setMessage('Signed out.')
  }

  function updateTitle(title: string) {
    setForm(current => ({
      ...current,
      title,
      slug: current.slug ? current.slug : createSlug(title),
    }))
  }

  async function uploadImage(file: File) {
    setMessage('')

    if (!userId) {
      setMessage('Sign in before uploading an image.')
      return
    }

    if (!file.type.startsWith('image/')) {
      setMessage('Please upload an image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image must be 5MB or smaller.')
      return
    }

    const supabase = getSupabase()
    if (!supabase) {
      setMessage('Supabase is not configured.')
      return
    }

    setUploading(true)

    const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
    const baseSlug = createSlug(form.slug || form.title || 'article-image')
    const path = `${userId}/${Date.now()}-${baseSlug}.${extension}`

    const { error } = await supabase.storage
      .from('article-images')
      .upload(path, file, {
        cacheControl: '31536000',
        upsert: false,
      })

    if (error) {
      setUploading(false)
      setMessage(error.message)
      return
    }

    const { data } = supabase.storage
      .from('article-images')
      .getPublicUrl(path)

    setForm(current => ({ ...current, imageUrl: data.publicUrl }))
    setUploading(false)
    setMessage('Image uploaded. The photo URL has been added.')
  }

  async function publishArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    if (!userId) {
      setMessage('Sign in before publishing.')
      return
    }

    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setMessage('Title, slug, and article content are required.')
      return
    }

    const supabase = getSupabase()
    if (!supabase) {
      setMessage('Supabase is not configured.')
      return
    }

    setSaving(true)

    const { error } = await supabase.from('ai_articles').insert({
      title: form.title.trim(),
      slug: createSlug(form.slug),
      content: form.content.trim(),
      language: form.language,
      image_url: form.imageUrl.trim() || null,
      author_id: userId,
    })

    setSaving(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setForm(emptyForm)
    setMessage('Article published.')
    loadArticles()
  }

  async function deleteArticle(article: Article) {
    const confirmed = window.confirm(`Delete "${article.title}"?`)
    if (!confirmed) return

    const supabase = getSupabase()
    if (!supabase) return

    const { error } = await supabase
      .from('ai_articles')
      .delete()
      .eq('id', article.id)

    if (error) {
      setMessage(error.message)
      return
    }

    setArticles(current => current.filter(item => item.id !== article.id))
    setMessage('Article deleted.')
  }

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-5 pt-32 text-white">
        <div className="mx-auto max-w-5xl text-white/65">Loading admin...</div>
      </main>
    )
  }

  if (!userId) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-5 pb-20 pt-32 text-white sm:px-8">
        <div className="mx-auto max-w-md rounded-lg border border-white/10 bg-black/45 p-6 shadow-2xl shadow-green-950/20">
          <p className="text-sm text-green-300/80">Olkeri Admin</p>
          <h1 className="mt-3 text-4xl font-medium">Sign in</h1>

          <form onSubmit={signIn} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-sm text-white/65">Email</span>
              <input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white/65">Password</span>
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-green-400 px-4 py-3 font-medium text-black transition-colors hover:bg-green-300"
            >
              Sign in
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-green-300">{message}</p>}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-5 pb-20 pt-32 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-green-300/80">aimploy.olkeri.space</p>
            <h1 className="mt-3 text-4xl font-medium sm:text-6xl">
              Article Admin
            </h1>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="w-fit rounded-md border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            Sign out
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <form
            onSubmit={publishArticle}
            className="rounded-lg border border-white/10 bg-black/45 p-5 shadow-2xl shadow-green-950/20 sm:p-6"
          >
            <h2 className="text-2xl font-medium">Write an article</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm text-white/65">Title</span>
                <input
                  value={form.title}
                  onChange={event => updateTitle(event.target.value)}
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                  placeholder="Article title"
                />
              </label>

              <label className="block">
                <span className="text-sm text-white/65">Slug</span>
                <input
                  value={form.slug}
                  onChange={event =>
                    setForm(current => ({
                      ...current,
                      slug: createSlug(event.target.value),
                    }))
                  }
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                  placeholder="article-slug"
                />
              </label>

              <label className="block">
                <span className="text-sm text-white/65">Language</span>
                <select
                  value={form.language}
                  onChange={event =>
                    setForm(current => ({
                      ...current,
                      language: event.target.value as ArticleLanguage,
                    }))
                  }
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                >
                  {articleLanguages.map(language => (
                    <option key={language.code} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm text-white/65">Photo URL</span>
                <input
                  value={form.imageUrl}
                  onChange={event =>
                    setForm(current => ({ ...current, imageUrl: event.target.value }))
                  }
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                  placeholder="https://..."
                />
                <span className="mt-2 block text-xs leading-5 text-white/45">
                  Use a 16:9 image for best results. Recommended size: 1600x900px. Minimum: 1200x675px.
                </span>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm text-white/65">Upload photo</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  disabled={uploading}
                  onChange={event => {
                    const file = event.target.files?.[0]
                    if (file) {
                      uploadImage(file)
                    }
                    event.target.value = ''
                  }}
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white file:mr-4 file:rounded-md file:border-0 file:bg-green-400 file:px-4 file:py-2 file:text-sm file:font-medium file:text-black disabled:cursor-not-allowed disabled:opacity-60"
                />
                <span className="mt-2 block text-xs leading-5 text-white/45">
                  JPG, PNG, or WebP. Max 5MB. Uploaded images are cropped responsively to 16:9 in cards and article pages.
                </span>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm text-white/65">Article</span>
                <textarea
                  value={form.content}
                  onChange={event =>
                    setForm(current => ({ ...current, content: event.target.value }))
                  }
                  rows={14}
                  className="mt-2 w-full resize-y rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                  placeholder="Write the full article..."
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-6 rounded-md bg-green-400 px-5 py-3 font-medium text-black transition-colors hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Publishing...' : 'Publish Article'}
            </button>

            {message && <p className="mt-4 text-sm text-green-300">{message}</p>}
          </form>

          <section className="rounded-lg border border-white/10 bg-black/35 p-5 sm:p-6">
            <h2 className="text-2xl font-medium">Manage articles</h2>

            <div className="mt-5 grid gap-3">
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                className="w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                placeholder="Search title, slug, article..."
              />

              <select
                value={languageFilter}
                onChange={event =>
                  setLanguageFilter(event.target.value as ArticleLanguage | 'all')
                }
                className="w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
              >
                <option value="all">All languages</option>
                {articleLanguages.map(language => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 space-y-3">
              {filteredArticles.length === 0 ? (
                <p className="text-sm text-white/55">No matching articles.</p>
              ) : (
                filteredArticles.map(article => (
                  <div
                    key={article.id}
                    className="rounded-md border border-white/10 bg-black/35 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-green-300/75">
                          {getLanguageName(article.language)}
                        </p>
                        <h3 className="mt-1 font-medium">{article.title}</h3>
                        <p className="mt-1 text-xs text-white/45">
                          {getArticlePath(article)}
                        </p>
                        <p className="mt-1 text-xs text-white/45">
                          {getReadTime(article.content)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteArticle(article)}
                        className="rounded-md border border-red-400/30 px-3 py-2 text-xs text-red-200 transition-colors hover:bg-red-400/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
