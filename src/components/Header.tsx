import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-black">
      <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-center">
        <nav className="flex items-center gap-10 text-sm font-medium">
          <Link href="/" className="text-white hover:text-green-400 transition-colors duration-200">
            Home
          </Link>
          <Link href="/contact" className="text-white hover:text-green-400 transition-colors duration-200">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
