import LegalPage from '@/components/LegalPage'
import { legalPages } from '@/lib/legal-pages'

export const metadata = {
  title: 'Privacy Policy | olkeri.space',
}

export default function PrivacyPolicyPage() {
  return <LegalPage content={legalPages['privacy-policy']} />
}
