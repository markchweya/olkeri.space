type ArticleFallbackImageProps = {
  title: string
  imageUrl?: string | null
  compact?: boolean
}

export default function ArticleFallbackImage({
  title,
  imageUrl,
  compact = false,
}: ArticleFallbackImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border ${
        compact ? 'aspect-[16/10]' : 'aspect-[16/9]'
      } border-current/10 bg-black/40`}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top,#063a28_0%,#020403_72%)] px-6 text-center">
          <span className="text-3xl font-semibold tracking-wide text-green-300 sm:text-4xl">
            olkeri.space
          </span>
        </div>
      )}
    </div>
  )
}
