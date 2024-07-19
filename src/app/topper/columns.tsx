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
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Data" />
    },
    cell: ({ cell }) => <div className="text-nowrap">{new Date(cell.getValue<string>()).toLocaleDateString()}</div>,
  },
  {
    id: 'cliente',
    accessorKey: 'client_name',
    header: 'Cliente',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'idade',
    header: 'Idade',
  },
  {
    accessorKey: 'hour',
    header: 'Hora',
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
