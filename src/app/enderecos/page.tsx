'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'

import { useStateAddress } from './useStateAddress'
import { TableAddress } from '@/template/address/Table'
import { FormProvider } from 'react-hook-form'
import { useFormAddress } from './useFormAddress'
import { ModalAddress } from '@/template/address/Modal'

export default function Enderecos() {
  const methods = useFormAddress()
  const { isOpen, setIsOpen } = useStateAddress()

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
          <TableAddress openModal={openModal} />
        </Wrap>

        <ModalAddress isOpen={isOpen} closeModal={closeModal} />
      </FormProvider>
    </Layout>
  )
}
