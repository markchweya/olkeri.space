'use client'

import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const supabase = getSupabase()
    if (!supabase) return

    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setPosts(data)
      data.forEach(async (post: any) => {
        await supabase
          .from('posts')
          .update({ views: (post.views || 0) + 1 })
          .eq('id', post.id)
      })
    }
  }

  async function vote(id: string, field: 'likes_up' | 'likes_down', current: number) {
    const supabase = getSupabase()
    if (!supabase) return

    await supabase
      .from('posts')
      .update({ [field]: current + 1 })
      .eq('id', id)

    fetchPosts()
  }

  return (
    <main className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-green-500 mb-12">Blog</h1>

      <div className="space-y-16">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-white/10 pb-10">
            <div className="relative w-full aspect-[16/9] max-h-[200px] md:max-h-[220px] overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
              {post.image_url ? (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl md:text-4xl text-green-400 font-semibold tracking-wide">
                    olkeri.space
                  </span>
                </div>
              )}
            </div>

            <h2 className="text-3xl font-semibold text-green-400 mb-3">
              {post.title}
            </h2>

            <p className="text-sm text-white/60 mb-6">
              Published on {new Date(post.created_at).toLocaleDateString()} at {new Date(post.created_at).toLocaleTimeString()} · Author: olkeri.space
            </p>

            <p className="text-white/90 leading-relaxed mb-6">
              {post.content}
            </p>

            <div className="flex items-center gap-8 text-sm text-white/70">
              <button
                onClick={() => vote(post.id, 'likes_up', post.likes_up || 0)}
                className="hover:text-green-400 transition-colors"
              >
                👍 {post.likes_up || 0}
              </button>

              <button
                onClick={() => vote(post.id, 'likes_down', post.likes_down || 0)}
                className="hover:text-red-400 transition-colors"
              >
                👎 {post.likes_down || 0}
              </button>

              <span className="flex items-center gap-2">
                👁 {post.views || 0}
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
