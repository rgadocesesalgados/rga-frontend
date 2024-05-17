'use client'
import { DataTable } from '@/components/ui-componets/data-table'
import { columns } from './columns'
import { useEffect } from 'react'
import { useRelatorios } from '@/contexts/relatorios'

export const Bolos = () => {
  const { getRelatorios, relatorios } = useRelatorios()

  useEffect(() => {
    getRelatorios()
  }, [])
  return (
    <>
      <DataTable columns={columns} data={relatorios?.bolos || []} inputFilter="client" inputFilterLabel="cliente" />
    </>
  )
}
