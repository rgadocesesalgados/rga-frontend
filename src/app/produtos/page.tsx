'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { FormProvider } from 'react-hook-form'
import { TableProdutos } from '@/template/produtos/Table'
import { ModalProdutos } from '@/template/produtos/Modal'
import { useFormProdutos } from './useFormProdutos'

export default function Produtos() {
  const methods = useFormProdutos()

  return (
    <Layout>
      <FormProvider {...methods}>
        <Wrap className="space-y-5">
          <TableProdutos>
            <ModalProdutos />
          </TableProdutos>
        </Wrap>
      </FormProvider>
    </Layout>
  )
}
