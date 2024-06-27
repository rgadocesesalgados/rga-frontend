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
  docesPP: GetOrderProduct[]
  payment: GetPayment[]
  date: Date
  hour: string
  cor_forminhas: string
  observations: string
  total: number
  delivery: boolean
  status: 'RASCUNHO' | 'ANOTADO' | 'EM_PRODUCAO' | 'ENTREGUE' | 'CANCELADO'
}
