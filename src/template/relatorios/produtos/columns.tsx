'use client'
import { GetProdutos } from '@/types/relatorios'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<GetProdutos>[] = [
  { accessorKey: 'date', header: 'Data', cell: ({ cell }) => new Date(cell.getValue<Date>()).toLocaleDateString() },
]
