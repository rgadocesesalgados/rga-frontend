import Layout from '@/app/dashboard/layout'
import { View } from './View'

interface OrdeForClientProps {
  params: Promise<{ clientId: string }>
}

export default async function OrdeForClient({ params }: OrdeForClientProps) {
  const { clientId } = await params

  return (
    <Layout>
      <View clientId={clientId} />
    </Layout>
  )
}
