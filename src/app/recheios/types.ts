import { z } from 'zod'
import { schema } from './schema'

export type FormDataRecheios = z.infer<typeof schema>

export interface RecheiosProps {
  id?: string
  name: string
  price: number
  is_pesado: boolean
  to_bento_cake: boolean
  banner?: string
  price_fixed: boolean
}

export interface RecheioPropsRequestToCreate extends Omit<RecheiosProps, 'id'> {}

export interface RecheioPropsRequestToEdit extends Omit<RecheiosProps, 'id'> {
  id: string
}
