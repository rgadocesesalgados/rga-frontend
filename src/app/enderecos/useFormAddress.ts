import { useForm } from 'react-hook-form'
import { FormDataAddress } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'

export const useFormAddress = () => {
  const methods = useForm<FormDataAddress>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      id: '',
      rua: '',
      numero: 0,
      bairro: '',
      ponto_de_referencia: '',
      cidade: '',
      frete_moto: 5,
      frete_carro: 10,
    },
  })
  return methods
}
