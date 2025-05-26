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
import { List, MoreHorizontal, SquarePen, XCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { useFormContext } from 'react-hook-form'
import { useModal } from '@/contexts/modal'
import { Column } from '@/template/recheios/Table/columns/components'
import { ClientProps, FormDataCliente } from '@/app/clientes/types'
import { useContextClient } from '@/contexts/dataContexts/clientesContext/useContextClient'
import { useQueryState } from 'nuqs'
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<ClientProps>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead label="Nome" toggleSorting={toggleSorting} />
    },
    cell: ({ cell }) => <div className="text-nowrap">{cell.getValue<string>()}</div>,
  },
  {
    accessorKey: 'tel',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead toggleSorting={toggleSorting} label="Telefone" />
    },
  },

  {
    accessorKey: 'address',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead toggleSorting={toggleSorting} label="Categoria" />
    },
    cell: ({ cell }) => <div className="text-nowrap">{cell.getValue<string>()}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { removeClient, getAllClients } = useContextClient()
      const methods = useFormContext<FormDataCliente>()
      const linha = row.original

      const { handleOpenClient } = useModal()

      const [, setAddressComplete] = useQueryState('address_complete')

      const { push } = useRouter()

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
                push(`/pedidos/${linha.id}`)
              }}
            >
              Pedidos
              <List className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                methods.reset(linha)
                setAddressComplete(linha.address)
                handleOpenClient()
              }}
            >
              Editar
              <SquarePen className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600 hover:bg-red-600 hover:text-white"
              onClick={() =>
                removeClient(linha.id)
                  .then(() => {
                    toast(`${linha.name} removido com sucesso`)
                    getAllClients()
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
