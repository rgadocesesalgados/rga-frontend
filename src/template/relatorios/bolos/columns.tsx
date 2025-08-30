'use client'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { GetBolos } from '@/types/relatorios/bolos/get'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<GetBolos>[] = [
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ cell }) => new Date(cell.getValue<Date>()).toLocaleDateString(),
  },
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
  {
    accessorKey: 'cobertura',
    header: 'Cobertura',
    cell: ({ getValue }) => <span className="capitalize">{getValue<GetBolos['cobertura']>().toLocaleLowerCase()}</span>,
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ cell }) => <span className="capitalize">{cell.getValue<string>() ? cell.getValue<string>() : '---'}</span>,
  },
  {
    accessorKey: 'banner',
    header: 'Modelo',
    cell: ({ cell }) => {
      const image = cell.getValue<string>()

      return image ? (
        <a href={image} target="_blank" rel="noreferrer">
          <img className="rounded-2xl" alt={image} width={125} height={125} src={image} />
        </a>
      ) : (
        '---'
      )
    },
  },
  {
    accessorKey: 'topper',
    header: 'Tem topper',
    cell: ({ cell }) => (cell.getValue<GetBolos['topper']>() ? 'Sim' : 'Não'),
  },
  { accessorKey: 'client', header: 'Cliente' },
  { accessorKey: 'hour', header: 'Horário' },
  {
    accessorKey: 'status_order',
    header: 'Status do pedido',
    cell: ({ getValue }) => (
      <Badge variant={getValue<GetBolos['status_order']>().toLocaleLowerCase() as BadgeProps['variant']}>
        {getValue<GetBolos['status_order']>()}
      </Badge>
    ),
  },
]
