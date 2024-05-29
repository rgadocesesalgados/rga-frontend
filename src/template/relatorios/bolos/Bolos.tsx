import { GetRelatorio } from '@/types/relatorios/get'
import { Button } from '@/components/ui/button'
import { useModalPrint } from '@/contexts/modalPrint'
import { DataTable } from '@/components/data-table'
import { useTable } from './useTable'
import { Input } from '@/components/ui/input'

export const Bolos = ({ data = [] }: { data: GetRelatorio['bolos'] }) => {
  const { handleOpen } = useModalPrint()
  const table = useTable(data)
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
      <div className="space-y-5 rounded-2xl border bg-white p-5">
        <Input
          placeholder={`Filtrar por cliente`}
          className="max-w-sm"
          value={(table.getColumn(`client`)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(`client`)?.setFilterValue(event.target.value)}
        />

        <DataTable table={table} />
      </div>
    </div>
  )
}
