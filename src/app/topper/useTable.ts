'use client'
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { columns } from './columns'
import { Tooper } from '../toppers/[fornecedor]/page'

export const useTable = ({ data }: { data: Tooper[] }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return table
}
