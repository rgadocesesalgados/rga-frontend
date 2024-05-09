import { DataTable } from '@/components/ui-componets/data-table'
import { columns } from './columns'
import { useContextRecheios } from '@/contexts/dataContexts/recheios/useContextRecheios'
import { useEffect } from 'react'

interface TableTemplateProps {
  children?: React.ReactNode
}
export const Table = ({ children }: TableTemplateProps) => {
  const { recheios, getAllRecheios } = useContextRecheios()
  useEffect(() => {
    getAllRecheios()
  }, [])
  return (
    <>
      {children}
      <DataTable columns={columns} data={recheios} inputFilter="name" inputFilterLabel="nome" />
    </>
  )
}
