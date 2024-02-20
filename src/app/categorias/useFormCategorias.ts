import { useForm } from 'react-hook-form'
import { FormDataCategorias } from './types'
import { schema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const useFormCategorias = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormDataCategorias>({
    resolver: zodResolver(schema),
  })

  return { register, handleSubmit, reset, setValue, errors }
}
