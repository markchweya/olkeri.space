import './globals.css'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Olkeri.space',
  description: 'Web development. Systems. AI. Applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${spaceGrotesk.className} bg-black text-white min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  )
}
