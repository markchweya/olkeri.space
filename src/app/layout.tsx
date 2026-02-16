import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout'

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
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.className} text-white min-h-screen antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
