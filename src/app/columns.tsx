'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DeliveryProps } from './page'

export const columns: ColumnDef<DeliveryProps>[] = [
  {
    accessorKey: 'hour',
    header: 'Horário',
  },
  {
    accessorKey: 'address_complete',
    header: 'Endereço',
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ cell }) => new Date(cell.getValue<Date>()).toLocaleDateString(),
    filterFn: (row, columnId, value) => {
      const dateValue = new Date(row.original[columnId])

      const filterDate = new Date(value)

      return filterDate <= dateValue
    },
  },
]
