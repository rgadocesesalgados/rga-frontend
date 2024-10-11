'use client'
import Layout from '../dashboard/layout'
import { Wrap } from '@/components/comum/Wrap'
import { DatePickerWithRange } from '@/components/ui-componets/date-picker-range'
import { useQuerys } from './hooks/useQuerys'
import { toBRL } from '../utils/toBRL'
import { Incoming, Outs } from './styles'
import { useDateRange } from './hooks/useDateRange'
import { Modal } from './components/Modal'
import { TrendingDown, TrendingUp } from 'lucide-react'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { useState } from 'react'
import { DataTablePagination } from '@/components/data-table/Pagination'

export default function Financeiro() {
  const { dates, setDates } = useDateRange()

  const { entradas, getEntradas, getOuts, saidas } = useQuerys(dates)

  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data: saidas.data?.outs || [],
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting },
  })
  return (
    <Layout>
      <Wrap className="space-y-5">
        <DatePickerWithRange
          date={dates}
          setDate={setDates}
          onChange={() => {
            const startDate = dates?.from?.getTime()
            const endDate = dates?.to?.getTime()

            getEntradas.mutate({ startDate, endDate })
            getOuts.mutate({ endDate, startDate })
          }}
        />

        <div className="my-5 flex divide-x rounded-xl border bg-white">
          <Incoming>
            <TrendingUp />
            {entradas.data && toBRL(entradas.data.value)}
          </Incoming>

          <Outs>
            <TrendingDown />
            {saidas.data && toBRL(saidas.data.total)}
          </Outs>
        </div>

        <Modal />

        <div className="rounded-xl border bg-white p-5">
          <DataTable table={table} />

          <DataTablePagination table={table} />
        </div>
      </Wrap>
    </Layout>
  )
}
