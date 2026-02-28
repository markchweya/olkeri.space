import Link from "next/link";

const posts = [
  {
    slug: "first-post",
    title: "First Post",
    content: "This is your first blog post.",
    createdAt: new Date().toISOString(),
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-green-500">Blog</h1>

      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-green-200 pb-8">
            <h2 className="text-2xl font-semibold mb-2 text-green-800 hover:text-green-600 transition-colors">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>

            <p className="text-sm text-white/60 mb-4">
              Published on {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()} · Author: olkeri.space
            </p>

            <p className="leading-relaxed text-white/90">
              {post.content}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
