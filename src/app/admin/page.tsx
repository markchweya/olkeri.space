'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  articleLanguages,
  createSlug,
  getArticlePath,
  getLanguageName,
  getReadTime,
  newsCategories,
  newsRegions,
  type Article,
  type ArticleLanguage,
} from '@/lib/articles'

type ArticleForm = {
  title: string
  slug: string
  content: string
  language: ArticleLanguage
  summary: string
  category: string
  region: string
  sourceName: string
  sourceUrl: string
  imageUrl: string
  imageCredit: string
}

const emptyForm: ArticleForm = {
  title: '',
  slug: '',
  content: '',
  language: 'en',
  summary: '',
  category: '',
  region: '',
  sourceName: '',
  sourceUrl: '',
  imageUrl: '',
  imageCredit: '',
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  const data = (await response.json().catch(() => ({}))) as T & { error?: string }

  if (!response.ok) {
    throw new Error(data.error ?? `Request failed (${response.status})`)
  }

  return data
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [form, setForm] = useState<ArticleForm>(emptyForm)
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [query, setQuery] = useState('')
  const [languageFilter, setLanguageFilter] = useState<ArticleLanguage | 'all'>('all')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const loadArticles = useCallback(async () => {
    try {
      const data = await api<{ articles: Article[] }>('/api/admin/articles')
      setArticles(data.articles)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not load articles.')
    }
  }, [])

  useEffect(() => {
    let mounted = true

    api<{ authenticated: boolean }>('/api/admin/session')
      .then(data => {
        if (mounted) setAuthenticated(data.authenticated)
      })
      .catch(() => undefined)
      .finally(() => {
        if (mounted) setAuthLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!authenticated) return

    const timeout = window.setTimeout(() => {
      loadArticles()
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [authenticated, loadArticles])

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

    try {
      await api('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      })
      setAuthenticated(true)
      setPassword('')
      setMessage('Signed in.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Sign-in failed.')
    }
  }

  async function signOut() {
    await api('/api/admin/logout', { method: 'POST' }).catch(() => undefined)
    setAuthenticated(false)
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

  function startEditingArticle(article: Article) {
    setEditingArticleId(article.id)
    setForm({
      title: article.title,
      slug: article.slug,
      content: article.content,
      language: article.language,
      summary: article.summary ?? '',
      category: article.category ?? '',
      region: article.region ?? '',
      sourceName: article.source_name ?? '',
      sourceUrl: article.source_url ?? '',
      imageUrl: article.image_url ?? '',
      imageCredit: article.image_credit ?? '',
    })
    setMessage(`Editing "${article.title}".`)
  }

  function resetArticleForm() {
    setEditingArticleId(null)
    setForm(emptyForm)
    setMessage('')
  }

  async function saveArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setMessage('Title, slug, and article content are required.')
      return
    }

    setSaving(true)

    const submitter = (event.nativeEvent as SubmitEvent).submitter as
      | HTMLButtonElement
      | null
    const shouldRepublish =
      !editingArticleId || submitter?.value === 'republish'

    const payload = {
      title: form.title.trim(),
      slug: createSlug(form.slug),
      content: form.content.trim(),
      language: form.language,
      summary: form.summary.trim() || undefined,
      category: form.category || undefined,
      region: form.region || undefined,
      sourceName: form.sourceName.trim() || undefined,
      sourceUrl: form.sourceUrl.trim() || undefined,
      imageUrl: form.imageUrl.trim() || undefined,
      imageCredit: form.imageCredit.trim() || undefined,
    }

    try {
      if (editingArticleId) {
        await api(`/api/admin/articles/${editingArticleId}`, {
          method: 'PUT',
          body: JSON.stringify({ ...payload, republish: shouldRepublish }),
        })
      } else {
        await api('/api/admin/articles', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      }

      setForm(emptyForm)
      setEditingArticleId(null)
      setMessage(
        editingArticleId
          ? shouldRepublish
            ? 'Article updated and republished.'
            : 'Article updated.'
          : 'Article published.'
      )
      loadArticles()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  async function republishArticle(article: Article) {
    setMessage('')

    try {
      await api(`/api/admin/articles/${article.id}`, {
        method: 'PUT',
        body: JSON.stringify({ republish: true }),
      })
      setMessage(`"${article.title}" was republished.`)
      loadArticles()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Republish failed.')
    }
  }

  async function deleteArticle(article: Article) {
    const confirmed = window.confirm(`Delete "${article.title}"?`)
    if (!confirmed) return

    try {
      await api(`/api/admin/articles/${article.id}`, { method: 'DELETE' })
      setArticles(current => current.filter(item => item.id !== article.id))
      if (editingArticleId === article.id) {
        resetArticleForm()
      }
      setMessage('Article deleted.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Delete failed.')
    }
  }

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-5 pt-32 text-white">
        <div className="mx-auto max-w-5xl text-white/65">Loading admin...</div>
      </main>
    )
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-5 pb-20 pt-32 text-white sm:px-8">
        <div className="mx-auto max-w-md rounded-lg border border-white/10 bg-black/45 p-6 shadow-2xl shadow-green-950/20">
          <p className="text-sm text-green-300/80">Olkeri Admin</p>
          <h1 className="mt-3 text-4xl font-medium">Sign in</h1>

          <form onSubmit={signIn} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-sm text-white/65">Password</span>
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                autoComplete="current-password"
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
            <p className="text-sm text-green-300/80">Olkeri · AI News</p>
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
            onSubmit={saveArticle}
            className="rounded-lg border border-white/10 bg-black/45 p-5 shadow-2xl shadow-green-950/20 sm:p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-medium">
                {editingArticleId ? 'Edit article' : 'Write an article'}
              </h2>
              {editingArticleId && (
                <button
                  type="button"
                  onClick={resetArticleForm}
                  className="w-fit rounded-md border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Cancel edit
                </button>
              )}
            </div>

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

              <label className="block">
                <span className="text-sm text-white/65">Category</span>
                <select
                  value={form.category}
                  onChange={event =>
                    setForm(current => ({ ...current, category: event.target.value }))
                  }
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                >
                  <option value="">No category</option>
                  {newsCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-white/65">Region</span>
                <select
                  value={form.region}
                  onChange={event =>
                    setForm(current => ({ ...current, region: event.target.value }))
                  }
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                >
                  <option value="">No region</option>
                  {newsRegions.map(region => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm text-white/65">Summary</span>
                <input
                  value={form.summary}
                  onChange={event =>
                    setForm(current => ({ ...current, summary: event.target.value }))
                  }
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                  placeholder="One-sentence summary shown on cards and in search results"
                />
              </label>

              <label className="block">
                <span className="text-sm text-white/65">Source name</span>
                <input
                  value={form.sourceName}
                  onChange={event =>
                    setForm(current => ({ ...current, sourceName: event.target.value }))
                  }
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                  placeholder="e.g. NVIDIA Newsroom"
                />
              </label>

              <label className="block">
                <span className="text-sm text-white/65">Source URL</span>
                <input
                  value={form.sourceUrl}
                  onChange={event =>
                    setForm(current => ({ ...current, sourceUrl: event.target.value }))
                  }
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                  placeholder="https://..."
                />
              </label>

              <label className="block">
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
                  Use a 16:9 image for best results. Recommended: 1600x900px.
                </span>
              </label>

              <label className="block">
                <span className="text-sm text-white/65">Image credit</span>
                <input
                  value={form.imageCredit}
                  onChange={event =>
                    setForm(current => ({ ...current, imageCredit: event.target.value }))
                  }
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-green-400"
                  placeholder="e.g. Unsplash / Jane Doe"
                />
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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                name="publishAction"
                value="save"
                disabled={saving}
                className="rounded-md bg-green-400 px-5 py-3 font-medium text-black transition-colors hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? editingArticleId
                    ? 'Saving...'
                    : 'Publishing...'
                  : editingArticleId
                    ? 'Save Changes'
                    : 'Publish Article'}
              </button>

              {editingArticleId && (
                <button
                  type="submit"
                  name="publishAction"
                  value="republish"
                  disabled={saving}
                  className="rounded-md border border-green-400/35 px-5 py-3 font-medium text-green-200 transition-colors hover:bg-green-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? 'Republishing...' : 'Save & Republish Now'}
                </button>
              )}
            </div>

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
                        <p className="mt-1 text-xs text-white/45">
                          {article.views ?? 0} views
                        </p>
                        <p className="mt-1 text-xs text-white/45">
                          Published{' '}
                          {new Date(
                            article.published_at ?? article.created_at
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => startEditingArticle(article)}
                          className="rounded-md border border-green-400/30 px-3 py-2 text-xs text-green-200 transition-colors hover:bg-green-400/10"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => republishArticle(article)}
                          className="rounded-md border border-cyan-300/30 px-3 py-2 text-xs text-cyan-100 transition-colors hover:bg-cyan-300/10"
                        >
                          Republish
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteArticle(article)}
                          className="rounded-md border border-red-400/30 px-3 py-2 text-xs text-red-200 transition-colors hover:bg-red-400/10"
                        >
                          Delete
                        </button>
                      </div>
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
