import { DataTable } from '@/components/ui-componets/data-table'
import { columns } from './columns'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { useEffect } from 'react'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'

export const TableProdutos = ({ children }: { children: React.ReactNode }) => {
  const { getAllProducts, products } = useContextProduct()
  const { getAllCategorys } = useContextCategory()

  useEffect(() => {
    getAllProducts()
    getAllCategorys()
  }, [])

  return (
    <>
      {children}
      <DataTable columns={columns} data={products} inputFilter="name" />
    </>
  )
}
