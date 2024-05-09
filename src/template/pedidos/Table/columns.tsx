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
import { MoreHorizontal, SquareMenu, SquarePen, XCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { useFormContext } from 'react-hook-form'
import { useModal } from '@/contexts/modal'
import { Column } from '@/template/recheios/Table/columns/components'
import { FormDataPedidos } from '@/app/pedidos/types'
import { StatusProps } from '@/app/pedidos/schema'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { useContextOrders } from '@/contexts/dataContexts/ordersContext/useContextOrders'
import { useView } from '@/contexts/view'
import { GetOrder } from '@/types/order'

export const columns: ColumnDef<GetOrder>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead label="Data" toggleSorting={toggleSorting} />
    },
    cell: ({ cell }) => <div className="text-nowrap">{new Date(cell.getValue<string>()).toLocaleDateString()}</div>,
  },
  {
    accessorKey: 'client.name',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead label="Nome" toggleSorting={toggleSorting} />
    },
    cell: ({ cell }) => <div className="text-nowrap">{cell.getValue<string>()}</div>,
  },

  {
    accessorKey: 'delivery',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead toggleSorting={toggleSorting} label="Retirada/Entrega" />
    },
    cell: ({ cell }) => (cell.getValue<boolean>() ? 'Entrega' : 'Retirada'),
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead toggleSorting={toggleSorting} label="Total" />
    },
    cell: ({ cell }) =>
      cell.getValue<number>().toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead toggleSorting={toggleSorting} label="Status" />
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
      const { removeOrder, getAllOrders } = useContextOrders()
      const methods = useFormContext<FormDataPedidos>()
      const linha = row.original

      const { address, orderProduct, date, ...rest } = linha

      console.log(orderProduct.map((i) => i.product_id))

      const order: FormDataPedidos = {
        address: address?.id,
        value_frete: address?.value_frete,
        logistic: address?.type_frete,
        orderProduct: orderProduct.reduce(
          (acc, item) => {
            if (typeof acc[item.category.priority] === 'undefined') {
              acc[item.category.priority] = [item]

              return acc
            }

            acc[item.category.priority].push(item)

            return acc
          },
          [] as FormDataPedidos['orderProduct'],
        ),
        date: new Date(date),
        ...rest,
      }

      const { handleOpenOrder } = useModal()
      const { handleOpen, setId } = useView()

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
                setId(linha.id)
                handleOpen()
              }}
            >
              Vizualizar
              <SquareMenu className="ml-2 h-4 w-4" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                console.log(order.orderProduct)
                methods.reset(order)
                handleOpenOrder()
              }}
            >
              Editar
              <SquarePen className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600 hover:bg-red-600 hover:text-white"
              onClick={() =>
                removeOrder(linha.id)
                  .then(() => {
                    toast(`Pedido de ${linha.client.name} removido com sucesso`)
                    getAllOrders()
                  })
                  .catch((error) => toast.error(error.response.data?.error))
              }
            >
              Excluir <XCircle className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
