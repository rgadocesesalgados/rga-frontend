'use client'
import { GetToppers } from '@/types/relatorios'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<GetToppers>[] = [
  { accessorKey: 'date', header: 'Data', cell: ({ cell }) => new Date(cell.getValue<Date>()).toLocaleDateString() },
  { accessorKey: 'client', header: 'Cliente' },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ getValue }) => {
      const name = getValue<string>()
      return name ? name : '---'
    },
  },
  {
    accessorKey: 'idade',
    header: 'Idade',
    cell: ({ getValue }) => {
      const idade = getValue<number>()
      return idade ? idade : '---'
    },
  },
  { accessorKey: 'tema', header: 'Tema' },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ getValue }) => {
      const description = getValue<string>()
      return description ? description : '---'
    },
  },
  {
    accessorKey: 'banner',
    header: 'Modelo',
    cell: ({ getValue }) => {
      const image = getValue<string>()
      return image ? (
        <a href={image} target="_blank" rel="noreferrer">
          <img src={image} alt={image} className="h-32 w-32 rounded-2xl object-cover" />
        </a>
      ) : (
        '---'
      )
    },
  },
  { accessorKey: 'hour', header: 'Hora' },
]
