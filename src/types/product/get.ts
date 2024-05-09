import { GetCategory } from '../category'

export interface GetProduct {
  id: string
  name: string
  price: number
  min_quantity: number
  banner: string
  category: GetCategory
}
