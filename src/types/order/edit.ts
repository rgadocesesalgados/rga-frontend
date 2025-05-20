import { EditAddressOrder } from '../address-order'
import { EditCake } from '../cake'
import { CreateProductOrder } from '../order-product'
import { PaymentCreate } from '../payment'

export interface EditOrder {
  id: string
  client_id: string
  date: Date
  hour: string
  bolo: EditCake[]
  address: EditAddressOrder
  orderProduct: CreateProductOrder[]
  payment: PaymentCreate[]
  cor_forminhas: string
  observations: string
  total: number
  delivery: boolean
  status: 'RASCUNHO' | 'ANOTADO' | 'EM_PRODUCAO' | 'ENTREGUE' | 'CANCELADO' | 'ORCAMENTO'
}
