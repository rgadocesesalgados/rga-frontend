'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { CheckCircle, Circle, Loader2, MoreHorizontal, Printer, SquarePen } from 'lucide-react'
import { toast } from 'react-toastify'
import { StatusProps } from '@/app/pedidos/schema'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table/ColumnHeader'
import { useOrderStates } from '@/template/pedidos/Table/useOrderStatus'
import { OrdersResponse, setOrderStatus } from '@/services/orders'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../layout'

export const columns: ColumnDef<OrdersResponse>[] = [
  {
    id: 'handleStatus',
    header: ({ table }) => {
      const selectedRowIds = table.getSelectedRowModel().rows.map((row) => row.original.id)

      const { mutate, isPending } = useMutation({
        mutationFn: setOrderStatus,
        onError(err) {
          toast.error('Erro ao alterar!')
          console.log(err)
        },
        onSuccess(_, { ids }) {
          let ordens = queryClient.getQueryData(['orders', 'organization']) as OrdersResponse[]

          ordens = ordens.map((data) => {
            if (ids.some((item) => data.id === item)) {
              return { ...data, status: 'RASCUNHO' }
            }

            return data
          })

          queryClient.setQueryData(['orders', 'organization'], ordens)

          toast.success('Alterados')
        },
      })

      return (
        <Button
          className="w-full"
          size="sm"
          variant="link"
          disabled={selectedRowIds.length === 0 || isPending}
          onClick={() => {
            mutate({ status: 'RASCUNHO', ids: selectedRowIds })
          }}
        >
          Rascunhar {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button variant="link" className="w-full" onClick={() => row.toggleSelected()}>
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
    id: 'name',
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ cell }) =>
      cell.getValue<number>()?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />
    },
    cell: ({ cell }) => {
      const status = cell.getValue<StatusProps>()

      const statusNormalized = status === 'EM_PRODUCAO' ? 'EM PRODUÇÃO' : status
      return <Badge variant={status.toLocaleLowerCase() as BadgeProps['variant']}>{statusNormalized}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const linha = row.original

      const { setOrderStates } = useOrderStates()
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                setOrderStates({ openPrint: true, orderId: linha.id })
              }}
            >
              Imprimir
              <Printer className="ml-2 h-4 w-4" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                setOrderStates({ openOrderModal: true, orderId: linha.id })
              }}
            >
              Editar
              <SquarePen className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
