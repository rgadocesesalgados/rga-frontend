'use client'

import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { useFormPedidos } from './useFormPedidos'
import { FormProvider } from 'react-hook-form'
import { TablePedidos } from '@/template/pedidos/Table'
import { ModalPedidos } from '@/template/pedidos/Modal'

export default function Pedios() {
  const methods = useFormPedidos()

  return (
    <Layout>
      <FormProvider {...methods}>
        <Wrap className="space-y-5">
          <TablePedidos>
            <ModalPedidos />
          </TablePedidos>
        </Wrap>
      </FormProvider>
    </Layout>
  )
}
