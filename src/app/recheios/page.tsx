'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { FormProvider, useForm } from 'react-hook-form'
import { FormDataRecheios } from './types'
import { Modal } from '@/template/recheios/modal'
import { schema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Table } from '@/template/recheios/Table'
import { ProviderRecheios } from '@/contexts/dataContexts/recheios'

const Recheios = () => {
  const methods = useForm<FormDataRecheios>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      to_bento_cake: false,
    },
  })
  return (
    <Layout>
      <ProviderRecheios>
        <Wrap className="space-y-5">
          <FormProvider {...methods}>
            <Modal />
            <Table />
          </FormProvider>
        </Wrap>
      </ProviderRecheios>
    </Layout>
  )
}
export default Recheios
