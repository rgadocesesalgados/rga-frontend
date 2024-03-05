import { z } from 'zod'
import { scheme } from './scheme'

export type FormDataCliente = z.infer<typeof scheme>

export interface ClientProps {
  id?: string
  name: string
  tel: string
  address_id: string
}
