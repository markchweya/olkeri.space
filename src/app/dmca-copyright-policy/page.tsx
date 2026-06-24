import LegalPage from '@/components/LegalPage'
import { legalPages } from '@/lib/legal-pages'

export const metadata = {
  title: 'DMCA / Copyright Policy | olkeri.space',
}

export default function DmcaCopyrightPolicyPage() {
  return <LegalPage content={legalPages['dmca-copyright-policy']} />
}
