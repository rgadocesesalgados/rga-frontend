'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import { DataTableColumnHeader } from '@/components/data-table/ColumnHeader'
import { Trash2 } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api/apiClient'
import { ErrorApi } from '@/services/api/types'
import { toast } from 'react-toastify'
import { OutProps } from './hooks/useQuerys'
import { toBRL } from '../utils/toBRL'

export const columns: ColumnDef<OutProps>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Data" />
    },
    cell: ({ cell }) => <div className="text-nowrap">{new Date(cell.getValue<number>()).toLocaleDateString()}</div>,
  },
  {
    accessorKey: 'supplier',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Fornecedor" />
    },
    cell: ({ cell }) => cell.getValue<string>(),
  },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Valor" />
    },
    cell: ({ cell }) => toBRL(cell.getValue<number>()),
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const queryClient = useQueryClient()

      const { mutate, isPending } = useMutation({
        mutationFn: async (id: string) => {
          await api.delete(`/out/${id}`)
        },

        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['outs'] })
        },

        onError: (erro) => {
          const error = erro as ErrorApi
          toast.error(error.response.data?.error)
          console.log(error.response?.data)
        },
      })
      const linha = row.original

      return (
        <Button size="icon" variant="destructive" onClick={() => mutate(linha.id)} disabled={isPending}>
          <Trash2 className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'address_complete',
    header: null,
    cell: null,
  },
]
