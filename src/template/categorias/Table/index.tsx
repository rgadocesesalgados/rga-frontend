import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useEffect } from 'react'
import { DataTable } from '@/components/ui-componets/data-table'
import { columns } from './columns'

export const TableCategory = ({ children }: { children: React.ReactNode }) => {
  const { categorys, getAllCategorys } = useContextCategory()

  useEffect(() => {
    getAllCategorys()
  }, [])

  return (
    <>
      {children}
      <DataTable columns={columns} data={categorys} inputFilter="name" />
    </>
  )
}
