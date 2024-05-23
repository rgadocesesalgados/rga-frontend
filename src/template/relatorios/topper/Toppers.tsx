import { DataTable } from '@/components/ui-componets/data-table'
import { columns } from './columns'
import { GetRelatorio } from '@/types/relatorios/get'

export const Toppers = ({ data = [] }: { data: GetRelatorio['toppers'] }) => {
  return <DataTable columns={columns} data={data} inputFilter="client" inputFilterLabel="cliente" />
}
