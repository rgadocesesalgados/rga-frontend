import { useForm } from 'react-hook-form'
import { FormDataCliente } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { scheme } from './scheme'

export const forms = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormDataCliente>({
    resolver: zodResolver(scheme),
    mode: 'onSubmit',
  })
  return {
    register,
    handleSubmit,
    reset,
    setValue,
    errors,
    watch,
  }
}
