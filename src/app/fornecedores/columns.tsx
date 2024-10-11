'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Supplier } from './schema'
import { DataTableColumnHeader } from '@/components/data-table/ColumnHeader'
import { Trash2 } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api/apiClient'
import { ErrorApi } from '@/services/api/types'
import { toast } from 'react-toastify'
import { maskTel } from '../utils/masks/maskTel'

export const columns: ColumnDef<Supplier & { id: string }>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nome" />
    },
    cell: ({ cell }) => <div className="text-nowrap">{cell.getValue<string>()}</div>,
  },
  {
    accessorKey: 'tel',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Telefone" />
    },
    cell: ({ cell }) => maskTel(cell.getValue<string>()),
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const queryClient = useQueryClient()

      const { mutate, isPending } = useMutation({
        mutationFn: async (id: string) => {
          await api.delete(`/supplier/${id}`)
        },

        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['suppliers'] })
        },

        onError: (erro) => {
          const error = erro as ErrorApi
          toast.error(error.response.data?.error)
          console.log(error.response?.data)
        },
      })
      const linha = row.original

      console.log(linha)

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
