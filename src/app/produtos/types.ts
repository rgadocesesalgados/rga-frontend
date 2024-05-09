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
  stock: number
  category_id: string
  stock_id: string
}

export interface ProductPropsRequestToCreate
  extends Omit<ProductProps, 'id' | 'stock_id' | 'stock' | 'category_name'> {}

export interface ProductPropsRequestToEdit extends Omit<ProductProps, 'stock_id' | 'stock' | 'category_name'> {}
