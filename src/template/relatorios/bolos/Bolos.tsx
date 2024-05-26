import { DataTable } from '@/components/ui-componets/data-table'
import { columns } from './columns'
import { GetRelatorio } from '@/types/relatorios/get'
import { Button } from '@/components/ui/button'
import { useModalPrint } from '@/contexts/modalPrint'

export const Bolos = ({ data = [] }: { data: GetRelatorio['bolos'] }) => {
  const { handleOpen } = useModalPrint()
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Bolos</h1>
        <Button
          variant="outline"
          onClick={() => {
            handleOpen()
          }}
        >
          Imprimir Bolos
        </Button>
      </div>
      <DataTable columns={columns} data={data} inputFilter="client" inputFilterLabel="cliente" />
    </div>
  )
}
