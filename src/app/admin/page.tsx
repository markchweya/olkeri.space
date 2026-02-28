'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title || !content) {
      setMessage('Title and content are required.')
      return
    }

    const { getSupabase } = await import('@/lib/supabase')
    const supabase = getSupabase()
    if (!supabase) {
      setMessage('Supabase not configured.')
      return
    }

    const { error } = await supabase
      .from('posts')
      .insert([{ title, content }])

    if (error) {
      setMessage('Error saving post.')
    } else {
      setMessage('Post published successfully.')
      setTitle('')
      setContent('')
    }
  }

  return (
    <main className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-green-500 mb-12">Admin – New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm text-white/70 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
            placeholder="Write your post content..."
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors"
        >
          Publish Post
        </button>

        {message && (
          <p className="text-sm text-green-400 mt-4">{message}</p>
        )}
      </form>
    </main>
  )
}
