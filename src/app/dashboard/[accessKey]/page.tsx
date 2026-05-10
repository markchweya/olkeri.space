import DashboardExperience from '@/components/DashboardExperience'

export const metadata = {
  title: 'Client Dashboard | olkeri.space',
  description: 'Client project dashboard for Olkeri project updates.',
}

export default async function ClientDashboardPage({
  params,
}: {
  params: Promise<{ accessKey: string }>
}) {
  const { accessKey } = await params

  return <DashboardExperience initialAccessKey={accessKey} />
}
