import { DataTable } from '@/components/ui-componets/data-table'
import { columns } from './columns'
import { GetRelatorio } from '@/types/relatorios/get'

export const Bolos = ({ data = [] }: { data: GetRelatorio['bolos'] }) => {
  return <DataTable columns={columns} data={data} inputFilter="client" inputFilterLabel="cliente" />
}
