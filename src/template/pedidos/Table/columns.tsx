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
import { MoreHorizontal, Printer, SquarePen, XCircle } from 'lucide-react'
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
import { useModalPrint } from '@/contexts/modalPrint'
import { useQueryState } from 'nuqs'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'

export const columns: ColumnDef<GetOrder>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead label="Data" toggleSorting={toggleSorting} />
    },
    cell: ({ cell }) => {
      const date = new Date(cell.getValue<string>()).toLocaleDateString()
      return <div className="text-nowrap">{date.slice(0, 6) + date.slice(8)}</div>
    },
  },
  {
    accessorKey: 'client.name',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead label="Nome" toggleSorting={toggleSorting} />
    },
    cell: ({ cell }) => cell.getValue<string>(),
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead toggleSorting={toggleSorting} label="Total" />
    },
    cell: ({ cell, row }) => {
      const payments = row.original.payment?.reduce((acc, item) => {
        if (item.paid) {
          return acc + item.value
        }
        return acc
      }, 0)

      return (
        <div className="flex justify-between gap-2 md:flex-col">
          <div>
            {cell.getValue<number>().toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>

          {payments > 0 && (
            <Badge>
              <div>pago:</div>
              <div>
                {payments
                  .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                  .slice(2)}
              </div>
            </Badge>
          )}
        </div>
      )
    },
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
      return (
        <Badge variant={status.toLocaleLowerCase() as BadgeProps['variant']} className="w-full md:w-fit">
          <div className="mx-auto">{statusNormalized}</div>
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { removeOrder, getAllOrders } = useContextOrders()
      const { categorys } = useContextCategory()
      const methods = useFormContext<FormDataPedidos>()
      const linha = row.original

      const { address, orderProduct, date, bolo, payment, boxes, ...rest } = linha

      const order: FormDataPedidos = {
        address: address?.id,
        value_frete: address?.value_frete,
        logistic: address?.type_frete,
        cakes: bolo?.map((cake) => ({
          id: cake.id,
          peso: cake.peso,
          formato: cake.formato,
          massa: cake.massa,
          recheios: cake.recheio,
          price: cake.price,
          cobertura: cake.cobertura,
          decoracao: cake.description ?? '',
          banner: cake.banner,
          tem_topper: cake.topper ? true : false,
          topper: {
            tema: cake.topper?.tema ?? '',
            name: cake.topper?.name ?? '',
            idade: cake.topper?.idade,
            price: cake.topper?.price ?? 18,
            description: cake.topper?.description ?? '',
            banner: cake.topper?.banner ?? '',
            recebido: cake.topper?.recebido ?? false,
            fornecedor: cake.topper?.fornecedor,
          },
        })),
        orderProduct: categorys
          .filter((category) => category.boxes.length === 0)
          .reduce((acc, category, index) => {
            acc[index] = orderProduct.filter((prod) => prod.category.id === category.id)
            return acc
          }, []),
        date: new Date(date),
        payment: payment.map((pay) => {
          return {
            date: pay.date ? new Date(pay.date) : new Date(),
            paid: pay.paid,
            value: pay.value,
            formPayment: pay.type,
          }
        }),
        boxes: categorys
          .filter((category) => category.boxes.length > 0)
          .reduce(
            (acc, category, index) => {
              acc[index] = boxes.filter((box) => box.category_id === category.id)

              return acc
            },
            [] as FormDataPedidos['boxes'],
          ),

        ...rest,
      }

      const { handleOpenOrder } = useModal()
      const { setId } = useView()
      const { handleOpen: handleOpenPrint } = useModalPrint()
      const [, setClientName] = useQueryState('client')
      const [, setAddressComplete] = useQueryState('address_complete')
      const [, setFreteCarro] = useQueryState('frete_carro')
      const [, setFreteMoto] = useQueryState('frete_moto')
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full space-x-1 md:w-full md:space-x-0">
              <span className="md:hidden">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                setId(linha.id)
                handleOpenPrint()
              }}
            >
              Imprimir
              <Printer className="ml-2 h-4 w-4" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                setClientName(linha.client.name)
                setFreteCarro(`${address?.frete_carro}`)
                setFreteMoto(`${address?.frete_moto}`)

                setAddressComplete(address?.address_complete)
                console.log(order)
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
              onClick={() => {
                const confirm = prompt('Digite SIM para confirmar')

                if (confirm !== 'SIM') return

                removeOrder(linha.id)
                  .then(() => {
                    toast(`Pedido de ${linha.client.name} removido com sucesso`)
                    getAllOrders()
                  })
                  .catch((error) => toast.error(error.response.data?.error))
              }}
            >
              Excluir <XCircle className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
