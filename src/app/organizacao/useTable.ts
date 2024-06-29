import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { columns } from './columns'
import { GetOrder } from '@/types/order'
import { useState } from 'react'

export const useTable = (data: GetOrder[]) => {
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
  })

  return table
}
