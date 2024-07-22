import { columns } from './columns'
import { GetRelatorio } from '@/types/relatorios/get'
import { Button } from '@/components/ui/button'
import { useModalPrint } from '@/contexts/modalPrint'
import { useState } from 'react'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import { DataTablePagination } from '@/components/data-table/Pagination'

export const Toppers = ({ data = [] }: { data: GetRelatorio['toppers'] }) => {
  const { handleOpenTopper } = useModalPrint()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilter] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    columns: columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilter,
    autoResetPageIndex: false,
    state: { sorting, columnFilters },
    initialState: { pagination: { pageSize: 10 } },
  })

  const rows = table.getRowModel().rows

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Toppers</h1>
        <Button
          variant="outline"
          onClick={() => {
            handleOpenTopper()
          }}
        >
          Imprimir Toppers
        </Button>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border bg-white p-5">
        <Input
          placeholder={`Filtrar por cliente`}
          className="max-w-sm"
          value={(table.getColumn(`client`)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(`client`)?.setFilterValue(event.target.value)}
        />
        <DataTable table={table} />

        <div className="flex gap-2 px-3 text-sm font-bold">
          <div>{rows.length} toppers</div>
          <div>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(rows.map((row) => row.original.price).reduce((acc, price) => acc + price, 0))}
          </div>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
