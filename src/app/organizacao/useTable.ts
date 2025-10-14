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
import { useState } from 'react'
import { OrdersResponse } from '@/services/orders'

export const useTable = (data: OrdersResponse[]) => {
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
