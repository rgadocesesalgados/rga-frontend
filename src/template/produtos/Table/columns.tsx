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
import { FormDataProdutos, ProductProps } from '@/app/produtos/types'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { useView } from '@/contexts/view'

export const columns: ColumnDef<ProductProps>[] = [
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
    cell: ({ cell }) =>
      cell.getValue<number>().toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
  },

  {
    accessorKey: 'category_name',
    header: ({ column }) => {
      const toggleSorting = () => column.toggleSorting(column.getIsSorted() === 'asc')

      return <Column.SortingHead toggleSorting={toggleSorting} label="Categoria" />
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { removeProduct, getAllProducts } = useContextProduct()
      const methods = useFormContext<FormDataProdutos>()
      const linha = row.original
      const { setId, handleOpen } = useView()

      const { handleOpenProduct } = useModal()

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
                handleOpen()
                setId(linha.id)
              }}
            >
              Vizualizar
              <SquareMenu className="ml-2 h-4 w-4" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                methods.reset(linha)
                handleOpenProduct()
              }}
            >
              Editar
              <SquarePen className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600 hover:bg-red-600 hover:text-white"
              onClick={() =>
                removeProduct(linha.id)
                  .then(() => {
                    toast(`${linha.name} removido com sucesso`)
                    getAllProducts()
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
