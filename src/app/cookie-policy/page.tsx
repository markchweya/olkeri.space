import LegalPage from '@/components/LegalPage'
import { legalPages } from '@/lib/legal-pages'

export const metadata = {
  title: 'Cookie Policy | olkeri.space',
}

export default function CookiePolicyPage() {
  return <LegalPage content={legalPages['cookie-policy']} />
}
