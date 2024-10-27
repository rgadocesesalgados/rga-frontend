'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DeliveryProps } from './page'
import { Bike, Truck } from 'lucide-react'

export const columns: ColumnDef<DeliveryProps>[] = [
  {
    accessorKey: 'hour',
    header: 'Horário',
  },
  {
    accessorKey: 'type_delivery',
    header: 'Frete',
    cell: ({ getValue }) =>
      getValue<DeliveryProps['type_delivery']>() === 'FRETE_CARRO' ? (
        <div className="w-min rounded-xl bg-yellow-400 p-2">
          <Truck className="h-4 w-4" />
        </div>
      ) : (
        <div className="w-min rounded-xl bg-violet-700 p-2 text-white">
          <Bike className="h-4 w-4" />
        </div>
      ),
  },
  {
    accessorKey: 'address_complete',
    header: 'Endereço',
    cell: ({ row }) => {
      const original = row.original
      return (
        <div className="flex flex-col gap-2">
          <div>{original.address_complete}</div>
          <div>{original.client_name}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ cell }) => new Date(cell.getValue<Date>()).toLocaleDateString(),
    filterFn: (row, columnId, value) => {
      const dateValue = new Date(row.original[columnId])

      const filterDateInitial = new Date(value)

      const filterDateEnd = new Date(value)

      filterDateInitial.setHours(0, 0, 0, 0)

      filterDateEnd.setHours(23, 59, 59, 999)

      return filterDateInitial <= dateValue && filterDateEnd >= dateValue
    },
  },
]
