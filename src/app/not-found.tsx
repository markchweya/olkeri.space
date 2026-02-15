export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl md:text-8xl font-semibold tracking-tight mb-6">
        <span className="text-white">4</span>
        <span className="bg-gradient-to-r from-white via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
          0
        </span>
        <span className="text-emerald-400">4</span>
      </h1>

      <p className="text-gray-400 max-w-md mb-8">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      <a
        href="/"
        className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-medium transition-colors duration-200"
      >
        Return Home
      </a>
    </div>
  )
}
