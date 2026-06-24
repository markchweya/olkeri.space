import LegalPage from '@/components/LegalPage'
import { legalPages } from '@/lib/legal-pages'

export const metadata = {
  title: 'Terms and Conditions | olkeri.space',
}

export default function TermsAndConditionsPage() {
  return <LegalPage content={legalPages['terms-and-conditions']} />
}
