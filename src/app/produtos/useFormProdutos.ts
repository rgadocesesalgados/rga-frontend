import { useForm } from 'react-hook-form'
import { FormDataProdutos } from './types'
import { scheme } from './scheme'
import { zodResolver } from '@hookform/resolvers/zod'

export const useFormProdutos = () => {
  const methods = useForm<FormDataProdutos>({
    resolver: zodResolver(scheme),
    mode: 'onSubmit',
  })

  return methods
}
