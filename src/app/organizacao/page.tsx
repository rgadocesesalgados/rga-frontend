'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { useEffect } from 'react'
import { useTable } from './useTable'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import { useModalPrint } from '@/contexts/modalPrint'
import { useFormPedidos } from '../pedidos/useFormPedidos'
import { FormProvider } from 'react-hook-form'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { useContextRecheios } from '@/contexts/dataContexts/recheios/useContextRecheios'
import { DataTablePagination } from '@/components/data-table/Pagination'
import { Print } from '@/template/pedidos/Table/print'
import { useOrderStates } from '@/template/pedidos/Table/useOrderStatus'
import { useQuery } from '@tanstack/react-query'
import { getOrdersOrganization, OrdersResponse } from '@/services/orders'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModalPedidos } from './Modal'

export default function Organizacao() {
  const { data, isLoading } = useQuery<OrdersResponse[]>({
    queryFn: getOrdersOrganization,
    queryKey: ['orders', 'organization'],
    initialData: [],
  })

  const { open } = useModalPrint()

  const table = useTable(data)

  const methods = useFormPedidos()

  const { getAllCategorys } = useContextCategory()
  const { getAllProducts } = useContextProduct()
  const { getAllRecheios } = useContextRecheios()

  useEffect(() => {
    getAllCategorys()
    getAllProducts()
    getAllRecheios()
  }, [])

  const { openPrint } = useOrderStates()

  if (openPrint) return <Print />

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
                  <Button size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <ModalPedidos />
              </div>

              <DataTable table={table} isLoading={isLoading} />

              <DataTablePagination table={table} />
            </div>
          </FormProvider>
        </Wrap>
      )}
    </Layout>
  )
}
