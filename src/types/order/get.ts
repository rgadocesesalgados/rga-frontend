import { GetAddressOrder } from '../address-order'
import { GetCake } from '../cake'

import { GetClient } from '../client'
import { GetOrderProduct } from '../order-product'
import { GetPayment } from '../payment'

export interface GetOrder {
  id: string
  client: GetClient
  address: GetAddressOrder
  bolo: GetCake[]
  orderProduct: GetOrderProduct[]
  boxes: {
    id: string
    size: number
    category_id: string
    products: { id: string; product_id: string; quantity: number; price: number; total: number; name: string }[]
  }[]
  payment: GetPayment[]
  date: Date
  hour: string
  cor_forminhas: string
  observations: string
  total: number
  delivery: boolean
  status: 'RASCUNHO' | 'ANOTADO' | 'EM_PRODUCAO' | 'ENTREGUE' | 'CANCELADO' | 'ORCAMENTO'
}
