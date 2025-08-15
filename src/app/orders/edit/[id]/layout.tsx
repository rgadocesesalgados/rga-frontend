'use client'

import Layout from '@/app/dashboard/layout'
import { useFormPedidos } from '@/app/pedidos/useFormPedidos'
import { Wrap } from '@/components/comum/Wrap'
import { FormProvider } from 'react-hook-form'

export default function LayoutEdit({ children }: { children: React.ReactNode }) {
  const methods = useFormPedidos()

  return (
    <Layout>
      <Wrap>
        <FormProvider {...methods}>{children}</FormProvider>
      </Wrap>
    </Layout>
  )
}
