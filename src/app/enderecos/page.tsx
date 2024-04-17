'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'

import { TableAddress } from '@/template/address/Table'
import { FormProvider } from 'react-hook-form'
import { useFormAddress } from './useFormAddress'
import { ModalAddress } from '@/template/address/Modal'

export default function Enderecos() {
  const methods = useFormAddress()

  return (
    <Layout>
      <FormProvider {...methods}>
        <Wrap className="space-y-5">
          <TableAddress>
            <ModalAddress />
          </TableAddress>
        </Wrap>
      </FormProvider>
    </Layout>
  )
}
