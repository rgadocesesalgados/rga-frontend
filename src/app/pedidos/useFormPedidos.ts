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
      client: { id: '' },
      date: new Date(),
      hour: '07:30',
      cakes: [],
      orderProduct: [],
      cor_forminhas: '',
      observations: '',
      delivery: false,
      address: '',
      logistic: 'FRETE_MOTO',
      value_frete: 0,
      total: 0,
      payment: [],
      boxes: [],
    },
  })

  return methods
}
