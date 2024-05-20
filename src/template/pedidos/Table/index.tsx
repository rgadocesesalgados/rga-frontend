import { DataTable } from '@/components/ui-componets/data-table'
import { columns } from './columns'
import { useEffect } from 'react'
import { useContextOrders } from '@/contexts/dataContexts/ordersContext/useContextOrders'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { useContextRecheios } from '@/contexts/dataContexts/recheios/useContextRecheios'
import { useContextClient } from '@/contexts/dataContexts/clientesContext/useContextClient'
import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'

export const TablePedidos = ({ children }: { children: React.ReactNode }) => {
  const { orders, getAllOrders } = useContextOrders()
  const { getAllCategorys } = useContextCategory()
  const { getAllProducts } = useContextProduct()
  const { getAllRecheios } = useContextRecheios()
  const { getAllClients } = useContextClient()
  const { getAllAddresses } = useContextAddress()

  useEffect(() => {
    getAllOrders()
    getAllClients()
    getAllCategorys()
    getAllProducts()
    getAllRecheios()
    getAllAddresses()
  }, [])

  return (
    <>
      {children}
      <DataTable columns={columns} data={orders} inputFilter="client_name" inputFilterLabel="cliente" />
    </>
  )
}
