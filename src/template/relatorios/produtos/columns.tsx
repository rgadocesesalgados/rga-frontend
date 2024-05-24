'use client'
import { GetProdutos } from '@/types/relatorios'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<GetProdutos>[] = [
  { accessorKey: 'name', header: 'Produto' },
  { accessorKey: 'quantity', header: 'Quantidade' },
  { id: 'actions', header: 'Total' },
]
