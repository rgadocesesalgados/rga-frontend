'use client'
import { DataTable } from '@/components/ui-componets/data-table'
import { columns } from './columns'
import { useRelatorios } from '@/contexts/relatorios'
import { useEffect } from 'react'

export const Toppers = () => {
  const { relatorios, getRelatorios } = useRelatorios()

  useEffect(() => {
    getRelatorios()
  }, [])

  return (
    <DataTable columns={columns} data={relatorios?.toppers || []} inputFilter="client" inputFilterLabel="cliente" />
  )
}
