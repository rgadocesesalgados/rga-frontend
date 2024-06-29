'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { useContextOrders } from '@/contexts/dataContexts/ordersContext/useContextOrders'
import { useEffect } from 'react'
import { useTable } from './useTable'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/data-table/ViewOptions'
import { ModalPrint } from '@/template/pedidos/modal-print/ModalPrint'
import { useModalPrint } from '@/contexts/modalPrint'
import { ModalPedidos } from '@/template/pedidos/Modal'
import { useFormPedidos } from '../pedidos/useFormPedidos'
import { FormProvider } from 'react-hook-form'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { useContextRecheios } from '@/contexts/dataContexts/recheios/useContextRecheios'
import { useContextClient } from '@/contexts/dataContexts/clientesContext/useContextClient'
import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { DataTablePagination } from '@/components/data-table/Pagination'

export default function Organizacao() {
  const { orders, getAllOrders } = useContextOrders()

  const { open } = useModalPrint()

  const table = useTable(orders)

  const methods = useFormPedidos()

  useEffect(() => {
    getAllOrders(true)
  }, [])

  const { getAllCategorys } = useContextCategory()
  const { getAllProducts } = useContextProduct()
  const { getAllRecheios } = useContextRecheios()
  const { getAllClients } = useContextClient()
  const { getAllAddresses } = useContextAddress()

  useEffect(() => {
    getAllClients()
    getAllCategorys()
    getAllProducts()
    getAllRecheios()
    getAllAddresses()
  }, [])
  return (
    <Layout>
      {!open && (
        <Wrap>
          <FormProvider {...methods}>
            <div className="flex flex-col gap-5 rounded-2xl border bg-white p-5">
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-5">
                  <Input
                    placeholder="Nome do cliente"
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                  />
                  <DataTableViewOptions table={table} />
                </div>

                <ModalPedidos all />
              </div>

              <DataTable table={table} />

              <DataTablePagination table={table} />
            </div>
          </FormProvider>
        </Wrap>
      )}

      <ModalPrint />
    </Layout>
  )
}
