import { Bolos } from '@/template/relatorios/bolos'
import Layout from '../dashboard/layout'
import { Wrap } from '@/components/comum/Wrap'
import { Toppers } from '@/template/relatorios/topper'

export default function Relatorios() {
  return (
    <Layout>
      <Wrap className="space-y-10">
        <Bolos />

        <Toppers />
      </Wrap>
    </Layout>
  )
}
