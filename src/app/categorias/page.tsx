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
            <p className="rounded-2xl border border-yellow-600 bg-white p-5  text-xs text-yellow-600">
              Categorias com prioridades menors que zero serão ocultadas
            </p>
            <ModalCategory />
          </TableCategory>
        </Wrap>
      </FormProvider>
    </Layout>
  )
}
