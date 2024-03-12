import { z } from 'zod'
import { scheme } from './scheme'

export type FormDataProdutos = z.infer<typeof scheme>

export type ProductProps = {
  id: string
  name: string
  price: number
  min_quantity: number
  banner: string
  category_name: string
}
