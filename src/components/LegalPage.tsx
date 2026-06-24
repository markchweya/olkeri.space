import { type LegalPageContent } from '@/lib/legal-pages'

type LegalPageProps = {
  content: LegalPageContent
}

export default function LegalPage({ content }: LegalPageProps) {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,#021a12_0%,#000000_70%)] px-5 pb-20 pt-32 text-white sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <article className="overflow-hidden rounded-lg border border-white/10 bg-black/45 shadow-2xl shadow-green-950/20 backdrop-blur">
          <div className="border-b border-white/10 bg-white/[0.03] px-5 py-8 sm:px-8 lg:px-10">
            <p className="mb-4 inline-flex rounded-full border border-green-400/30 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-green-300">
              Effective {content.effectiveDate}
            </p>
            <h1 className="max-w-3xl text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
                {content.title}
              </span>
            </h1>
            {content.intro && (
              <div className="mt-6 space-y-4 text-base leading-7 text-white/72 sm:text-lg">
                {content.intro.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8 px-5 py-8 sm:px-8 lg:px-10">
            {content.blocks.map(block => (
              <section
                key={block.heading ?? block.body?.[0]}
                className="border-b border-white/10 pb-8 last:border-b-0 last:pb-0"
              >
                {block.heading && (
                  <h2 className="mb-4 text-2xl font-medium text-white">
                    {block.heading}
                  </h2>
                )}

                {block.body && (
                  <div className="space-y-3 text-[15px] leading-7 text-white/70 sm:text-base">
                    {block.body.map(paragraph => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {block.bullets && (
                  <ul className="mt-4 grid gap-2 text-[15px] leading-6 text-white/72 sm:grid-cols-2 sm:text-base">
                    {block.bullets.map(item => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
