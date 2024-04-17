'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { useFormCategorias } from '../../template/categorias/useFormCategorias'
import { FormProvider } from 'react-hook-form'
import { TableCategory } from '@/template/categorias/Table'
import { ModalCategory } from '@/template/categorias/Modal'

export default function Categorias() {
  const methods = useFormCategorias()

  return (
    <Layout>
      <FormProvider {...methods}>
        <Wrap className="space-y-5">
          <TableCategory>
            <ModalCategory />
          </TableCategory>
        </Wrap>
      </FormProvider>
    </Layout>
  )
}
