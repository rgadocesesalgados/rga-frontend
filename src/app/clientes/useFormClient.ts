import { useForm } from 'react-hook-form'
import { FormDataCliente } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { scheme } from './scheme'

export const useFormClient = () => {
  const methods = useForm<FormDataCliente>({
    resolver: zodResolver(scheme),
    mode: 'onSubmit',
  })
  return methods
}
