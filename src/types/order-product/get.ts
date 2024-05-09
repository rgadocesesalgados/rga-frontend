import { GetProduct } from '../product'

export interface GetOrderProduct extends GetProduct {
  id: string
  product_id: string
  quantity: number
  price: number
  total: number
}
