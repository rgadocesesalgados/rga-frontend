import { PaymentCreate } from '../payment'
import { GetOrder } from './get'
import { GetClient } from '../client'
import { GetAddress } from '../address'
import { CreateCake } from '../cake/create'
import { CreateProductOrder } from '../order-product'

export interface CreateOrder
  extends Pick<GetOrder, 'date' | 'hour' | 'cor_forminhas' | 'delivery' | 'observations' | 'status' | 'total'> {
  client: Pick<GetClient, 'id'>
  address?: Pick<GetAddress, 'id'> & {
    type_frete: 'FRETE_MOTO' | 'FRETE_CARRO'
    value_frete: number
  }
  cakes?: CreateCake[]
  products?: CreateProductOrder[]
  payments?: PaymentCreate[]
  boxes?: {
    products?: {
      product_id?: string
      quantity?: number
      price?: number
      total?: number
    }[]
  }[]
}
