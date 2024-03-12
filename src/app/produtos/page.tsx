'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { FormProvider } from 'react-hook-form'
import { TableProdutos } from '@/template/produtos/Table'
import { useStateProdutos } from './useStateProduct'
import { ModalProdutos } from '@/template/produtos/Modal'
import { useFormProdutos } from './useFormProdutos'

export default function Produtos() {
  const { setIsOpen, isOpen } = useStateProdutos()
  const methods = useFormProdutos()

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
          <TableProdutos openModal={openModal} />
        </Wrap>

        <ModalProdutos closeModal={closeModal} isOpen={isOpen} />
      </FormProvider>
    </Layout>
  )
}
