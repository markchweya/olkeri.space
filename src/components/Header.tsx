'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-center">
        <nav className="flex items-center gap-10 text-sm font-medium">
          {pathname !== '/' && (
            <Link
              href="/"
              className="text-white hover:text-green-400 transition-colors duration-200"
            >
              Home
            </Link>
          )}

          {pathname !== '/contact' && (
            <Link
              href="/contact"
              className="text-white hover:text-green-400 transition-colors duration-200"
            >
              Contact
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
