import './globals.css'

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
    <html lang='en'>
      <body className='bg-[#050811]'>
        {children}
      </body>
    </html>
  )
}
