import { useForm } from 'react-hook-form'
import { FormData } from './types'

export const useFormRelatorio = () =>
  useForm<FormData>({
    defaultValues: { status: [{ value: 'RASCUNHO' }, { value: 'ANOTADO' }] },
  })
