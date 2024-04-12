'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Column } from './components'
import { FormDataRecheios, RecheiosProps } from '@/app/recheios/types'
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
import { useContextRecheios } from '@/contexts/dataContexts/recheios/useContextRecheios'
import { toast } from 'react-toastify'
import { useFormContext } from 'react-hook-form'

export const columns: ColumnDef<RecheiosProps>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead label="Nome" toggleSorting={toggleSorting} />
    },
    cell: ({ cell }) => <div className="text-nowrap">{cell.getValue<string>()}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead toggleSorting={toggleSorting} label="Preço" />
    },
    cell: ({ cell }) => (
      <div className="text-center">
        {cell.getValue<number>().toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </div>
    ),
  },
  {
    accessorKey: 'is_pesado',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead toggleSorting={toggleSorting} label="Pesado" />
    },
    cell: ({ cell }) => <div className="text-center">{cell.getValue() ? 'Sim' : 'Não'}</div>,
  },

  {
    accessorKey: 'to_bento_cake',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead toggleSorting={toggleSorting} label="Bento cake" />
    },
    cell: ({ cell }) => <div className="text-center">{cell.getValue() ? 'Sim' : 'Não'}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { removeRecheio, getAllRecheios } = useContextRecheios()
      const methods = useFormContext<FormDataRecheios>()
      const linha = row.original

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

            <DropdownMenuItem>
              Vizualizar
              <SquareMenu className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => methods.reset(linha)}>
              Editar
              <SquarePen className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600 hover:bg-red-600 hover:text-white"
              onClick={() =>
                removeRecheio(linha.id)
                  .then(() => {
                    toast(`${linha.name} removido com sucesso`)
                    getAllRecheios()
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
