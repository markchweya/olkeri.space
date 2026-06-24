import LegalPage from '@/components/LegalPage'
import { legalPages } from '@/lib/legal-pages'

export const metadata = {
  title: 'Editorial Policy | olkeri.space',
}

export default function EditorialPolicyPage() {
  return <LegalPage content={legalPages['editorial-policy']} />
}
