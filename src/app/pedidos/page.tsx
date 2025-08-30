'use client'

import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { useFormPedidos } from './useFormPedidos'
import { FormProvider } from 'react-hook-form'
import { TablePedidos } from '@/template/pedidos/Table'
import { ModalPedidos } from '@/template/pedidos/Modal'
import { ModalPrint } from '@/template/pedidos/modal-print/ModalPrint'
import { useModalPrint } from '@/contexts/modalPrint'

export default function Pedios() {
  const methods = useFormPedidos()
  const { open } = useModalPrint()
  console.log(methods.formState.errors)

  return (
    <Layout>
      <FormProvider {...methods}>
        <Wrap className="space-y-5">
          {!open && (
            <TablePedidos>
              <ModalPedidos />
            </TablePedidos>
          )}
        </Wrap>
      </FormProvider>

      <ModalPrint />
    </Layout>
  )
}
