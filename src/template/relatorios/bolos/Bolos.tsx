import { GetRelatorio } from '@/types/relatorios/get'
import { Button } from '@/components/ui/button'
import { useModalPrint } from '@/contexts/modalPrint'
import { DataTable } from '@/components/data-table'
import { useTable } from './useTable'
import { Input } from '@/components/ui/input'
import { DataTablePagination } from '@/components/data-table/Pagination'

export const Bolos = ({ data = [] }: { data: GetRelatorio['bolos'] }) => {
  const { handleOpen } = useModalPrint()
  const table = useTable(data)

  const rows = table.getRowModel().rows
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
        <div className="flex gap-2 px-3 text-sm font-bold">
          <div>{rows.length} bolos</div>
          <div>
            {Intl.NumberFormat('pt-BR', {
              style: 'decimal',
            }).format(rows.map((row) => row.original.peso).reduce((acc, peso) => acc + peso, 0))}
            kg
          </div>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
