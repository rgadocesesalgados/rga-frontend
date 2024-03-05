import { useForm } from 'react-hook-form'
import { FormDataAddress } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'

export const useFormAddress = () => {
  const methods = useForm<FormDataAddress>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })
  return methods
}
