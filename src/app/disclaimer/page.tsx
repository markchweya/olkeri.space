import LegalPage from '@/components/LegalPage'
import { legalPages } from '@/lib/legal-pages'

export const metadata = {
  title: 'Disclaimer | olkeri.space',
}

export default function DisclaimerPage() {
  return <LegalPage content={legalPages.disclaimer} />
}
