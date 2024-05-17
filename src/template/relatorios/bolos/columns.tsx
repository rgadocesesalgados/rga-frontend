'use client'
import { GetBolos } from '@/types/relatorios/bolos/get'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<GetBolos>[] = [
  { accessorKey: 'date', header: 'Data', cell: ({ cell }) => new Date(cell.getValue<Date>()).toLocaleDateString() },
  { accessorKey: 'peso', header: 'Peso', cell: ({ cell }) => `${cell.getValue<number>()}kg` },
  {
    accessorKey: 'formato',
    header: 'Formato',
    cell: ({ cell }) => (cell.getValue<GetBolos['formato']>() === 'QUADRADO' ? 'Quadrado' : 'Redondo'),
  },
  {
    accessorKey: 'massa',
    header: 'Massa',
    cell: ({ cell }) => <span className="capitalize">{cell.getValue<GetBolos['massa']>().toLocaleLowerCase()}</span>,
  },
  {
    accessorKey: 'recheio',
    header: 'Recheios',
    cell: ({ cell }) =>
      cell
        .getValue<GetBolos['recheio']>()
        .map((recheio) => recheio.name)
        .join(', '),
  },
  { accessorKey: 'client', header: 'Cliente' },
  { accessorKey: 'hour', header: 'Horário' },
]
