'use client'

import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { useFormPedidos } from './useFormPedidos'
import { FormProvider } from 'react-hook-form'
import { TablePedidos } from '@/template/pedidos/Table'
import { useStatePedidos } from './useStatePedidos'
import { ModalPedidos } from '@/template/pedidos/Modal'

export default function Pedios() {
  const methods = useFormPedidos()
  const { isOpen, setIsOpen } = useStatePedidos()

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Layout>
      <FormProvider {...methods}>
        <Wrap>
          <TablePedidos openModal={openModal} />
        </Wrap>

        <ModalPedidos isOpen={isOpen} closeModal={closeModal} />
      </FormProvider>
    </Layout>
  )
}
