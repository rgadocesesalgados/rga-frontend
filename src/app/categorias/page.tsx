'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { useStateCategorias } from '../../template/categorias/useStateCategorias'
import { useFormCategorias } from '../../template/categorias/useFormCategorias'
import { FormProvider } from 'react-hook-form'
import { TableCategory } from '@/template/categorias/Table'
import { ModalCategory } from '@/template/categorias/Modal'

export default function Categorias() {
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const { isOpen, setIsOpen } = useStateCategorias()

  const methods = useFormCategorias()

  return (
    <Layout>
      <FormProvider {...methods}>
        <Wrap>
          <TableCategory openModal={openModal} />
        </Wrap>

        <ModalCategory isOpen={isOpen} closeModal={closeModal} />
      </FormProvider>
    </Layout>
  )
}
