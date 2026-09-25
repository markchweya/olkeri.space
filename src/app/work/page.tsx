import type { Metadata } from 'next'

import WorkGrid from '@/components/WorkGrid'

export const metadata: Metadata = {
  title: 'Work — Olkeri',
  description:
    'Mobile apps, AI systems, data science and developer tools built by Olkeri, a software studio working across mobile, web, AI and data.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-5 py-32 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <WorkGrid />
      </div>
    </main>
  )
}
