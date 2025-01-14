'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from './dashboard/layout'
import { useEffect, useState } from 'react'
import { api } from '@/services/api/apiClient'
import { DataTable } from '@/components/data-table'
import { columns } from './columns'
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table'
import { DatePicker } from '@/components/ui/date-picker'

export interface DeliveryProps {
  id: string
  date: Date
  hour: string
  client_name: string
  address_complete: string
  type_delivery: 'FRETE_CARRO' | 'FRETE_MOTO'
  payment: number
}

const getDelivery = async () => {
  const response = await api.get('/delivery')

  return response.data
}
export default function Home() {
  const [deliveryData, setDeliveryData] = useState<DeliveryProps[]>([])

  useEffect(() => {
    getDelivery()
      .then((data) => setDeliveryData(data))
      .catch((err) => console.log(err))
      .finally(() => {
        console.log(deliveryData)
      })
  }, [])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: deliveryData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: { columnFilters },
  })
  return (
    <Layout>
      <Wrap>
        <div className="flex justify-between gap-2 py-5">
          <h1 className="text-xl font-bold">Entregas</h1>
          <DatePicker
            value={table.getColumn(`date`)?.getFilterValue() as Date}
            onChange={(date) => {
              table.getColumn(`date`)?.setFilterValue(date)
            }}
          />
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <DataTable table={table} />
        </div>
      </Wrap>
    </Layout>
  )
}
