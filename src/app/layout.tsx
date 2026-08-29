import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout'
import FooterLinks from '@/components/FooterLinks'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.olkeri.space'),
  title: {
    default: 'Olkeri — AI News',
    template: '%s | Olkeri AI News',
  },
  description:
    'Daily artificial-intelligence news from around the world, in English, French, German and Spanish.',
  openGraph: {
    siteName: 'Olkeri AI News',
    type: 'website',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
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

        {/* Google Extended Access (Subscribe with Google), configured in
            Publisher Center. Reports article access to Google News. */}
        <script
          async
          type="application/javascript"
          src="https://news.google.com/swg/js/v1/swg-basic.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(self.SWG_BASIC = self.SWG_BASIC || []).push(basicSubscriptions => {
  basicSubscriptions.init({
    type: "NewsArticle",
    isPartOfType: ["Product"],
    isPartOfProductId: "CAowjMPMDA:openaccess",
    clientOptions: { theme: "light", lang: "en" },
  });
});`,
          }}
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
                  © {new Date().getFullYear()} Olkeri — AI News · olkeri.space
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
