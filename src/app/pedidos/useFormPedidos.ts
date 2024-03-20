import { useForm } from 'react-hook-form'
import { FormDataPedidos } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'

export const useFormPedidos = () => {
  const methods = useForm<FormDataPedidos>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  return methods
}
