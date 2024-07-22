'use client'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { columns } from './columns'
import { GetRelatorio } from '@/types/relatorios/get'
import { useState } from 'react'

export const useTable = (data: GetRelatorio['bolos']) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  return useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { columnFilters },
    initialState: { pagination: { pageSize: 10 } },
  })
}
