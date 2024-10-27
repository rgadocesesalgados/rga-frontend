'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { CheckCircle, Circle } from 'lucide-react'
import { toast } from 'react-toastify'
import { Badge } from '@/components/ui/badge'

import { DataTableColumnHeader } from '@/components/data-table/ColumnHeader'
import { api } from '@/services/api/apiClient'

import { Tooper } from '@/app/toppers/page'
import { useContextTopper } from '@/contexts/dataContexts/topperContext/useContextTopper'

export const columns: ColumnDef<Tooper>[] = [
  {
    id: 'handleStatus',
    header: ({ table }) => {
      const selectedRowIds = table.getSelectedRowModel().rows.map((row) => row.original.id)

      const { getAllTopper } = useContextTopper()
      return (
        <Button
          size="sm"
          variant="link"
          disabled={selectedRowIds.length === 0}
          onClick={() => {
            api
              .patch('/topper', { ids: selectedRowIds })
              .then(() => {
                getAllTopper().then(() => {
                  table.resetRowSelection()
                  toast.success('Topper recebido com sucesso!')
                })
              })
              .catch((error) => {
                toast.error(error.response.data?.error)
              })
          }}
        >
          Receber
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button variant="ghost" size="icon" onClick={() => row.toggleSelected()}>
          {row.getIsSelected() ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
        </Button>
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ cell, row }) => {
      const origin = row.original
      return (
        <div className="">
          <div>{new Date(cell.getValue<string>()).toLocaleDateString()}</div>
          <div>{origin.client_name}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'banner',
    header: 'Modelo',
    cell: ({ cell }) => {
      const image = cell.getValue<string>()
      return image ? <img src={image} className="h-24 w-24 rounded-xl object-cover" /> : '---'
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome e idade',
    cell: ({ row }) => {
      const origin = row.original

      return (
        <div>
          <div>{origin.name}</div>
          <div>{origin.idade}</div>
          <div>{origin.description}</div>
        </div>
      )
    },
  },

  {
    accessorKey: 'hour',
    header: 'Hora',
  },

  {
    accessorKey: 'recebido',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />
    },
    cell: ({ cell }) => {
      const recebido = cell.getValue<boolean>()

      return <Badge variant={recebido ? 'anotado' : 'rascunho'}>{recebido ? 'Recebido' : 'Não Recebido'}</Badge>
    },
  },
]
