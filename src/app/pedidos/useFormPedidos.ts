import { useForm } from 'react-hook-form'
import { FormDataPedidos } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'

export const useFormPedidos = () => {
  const methods = useForm<FormDataPedidos>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      id: '',
      data: new Date(),
      hour: '07:30',
      observations: '',
      delivery: false,
      address: '',
      logistic: 'FRETE_MOTO',
      value_frete: 0,
      total: 0,
      status: 'RASCUNHO',
    },
  })

  return methods
}
