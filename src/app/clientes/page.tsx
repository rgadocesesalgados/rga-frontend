'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { useFormClient } from './useFormClient'

import { FormProvider } from 'react-hook-form'
import { TableClient } from '@/template/clientes/Table'
import { ModalClient } from '@/template/clientes/Modal'

export default function Clientes() {
  const methods = useFormClient()

  return (
    <Layout>
      <FormProvider {...methods}>
        <Wrap className="space-y-5">
          <TableClient>
            <ModalClient />
          </TableClient>
        </Wrap>
      </FormProvider>
    </Layout>
  )
}
