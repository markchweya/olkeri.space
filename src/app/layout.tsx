import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout'
import FooterLinks from '@/components/FooterLinks'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'olkeri.space',
  description: 'Web development. Systems. AI. Applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4070347184423387"
          crossOrigin="anonymous"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.className} text-white min-h-screen antialiased`}
      >
        <ClientLayout>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">{children}</div>

            <footer className="py-8 text-sm border-t border-white/10">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-white/70">
                  © {new Date().getFullYear()} olkeri.space
                </p>

                <FooterLinks />
              </div>
            </footer>
          </div>
        </ClientLayout>
      </body>
    </html>
  )
}
