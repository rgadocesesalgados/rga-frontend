import { DataTable } from '@/components/ui-componets/data-table'
import { columns } from './columns'
import { GetRelatorio } from '@/types/relatorios/get'

export const Produtos = ({ data = [] }: { data: GetRelatorio['produtos'] }) => {
  const categorys = data.map((item) => item.category_name)

  return categorys.map((category) => {
    const dataProdutos = data.filter((item) => item.category_name === category)

    return <DataTable key={category} columns={columns} data={dataProdutos} inputFilter="name" inputFilterLabel="nome" />
  })
}
