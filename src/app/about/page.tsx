import LegalPage from '@/components/LegalPage'
import { legalPages } from '@/lib/legal-pages'

export const metadata = {
  title: 'About Olkeri',
  description:
    'Olkeri is an independent publication covering artificial intelligence worldwide in English, French and German. Who we are, how we work, and how to reach us.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return <LegalPage content={legalPages['about']} />
}
