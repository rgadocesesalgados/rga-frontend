'use client'
import * as S from './styles'

import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { DataTable } from '@/components/data-table'
import { useTable } from './useTable'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useContextTopper } from '@/contexts/dataContexts/topperContext/useContextTopper'
import { DataTablePagination } from '@/components/data-table/Pagination'

export default function Topper() {
  const { topper, getAllTopper } = useContextTopper()

  const date = new Date()
  date.setHours(0, 0, 0, 0)

  useEffect(() => {
    getAllTopper().catch((error) => {
      console.log(error)
      toast.error(error.response.data?.error)
    })
  }, [])

  const table = useTable({ data: topper })

  return (
    <Layout>
      <Wrap>
        <S.container>
          <DataTable table={table} />
          <DataTablePagination table={table} />
        </S.container>
      </Wrap>
    </Layout>
  )
}
