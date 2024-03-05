import { z } from 'zod'
import { schema } from './schema'

export type FormDataAddress = z.infer<typeof schema>

export interface AddressProps {
  id?: string
  rua: string
  numero: number
  bairro: string
  ponto_de_referencia: string
  cidade: string
  address_complete: string
  frete_moto: number
  frete_carro: number
}
