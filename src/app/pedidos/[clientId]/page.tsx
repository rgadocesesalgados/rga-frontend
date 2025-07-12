import Layout from '@/app/dashboard/layout'
import { QueryProvider } from './QueryProvider'

interface OrdeForClientProps {
  params: Promise<{ clientId: string }>
}

export default async function OrdeForClient({ params }: OrdeForClientProps) {
  const { clientId } = await params

  return (
    <Layout>
      <QueryProvider clientId={clientId} />
    </Layout>
  )
}
