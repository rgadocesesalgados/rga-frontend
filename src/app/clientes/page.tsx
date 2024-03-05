'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { useStateClient } from './useStatatClient'
import { useFormClient } from './useFormClient'

import { FormProvider } from 'react-hook-form'
import { TableClient } from '@/template/clientes/Table'
import { ModalClient } from '@/template/clientes/Modal'

export default function Clientes() {
  const methods = useFormClient()

  const { isOpen, setIsOpen } = useStateClient()

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
          <TableClient openModal={openModal} />
        </Wrap>

        <ModalClient isOpen={isOpen} closeModal={closeModal} />
      </FormProvider>
    </Layout>
  )
}
