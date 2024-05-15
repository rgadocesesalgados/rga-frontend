import { EditAddressOrder } from '../address-order'
import { EditCake } from '../cake'
import { EditOrderProduct } from '../order-product'
import { EditPayment } from '../payment'

export interface EditOrder {
  id: string
  client_id: string
  date: Date
  hour: string
  bolo: EditCake[]
  address: EditAddressOrder
  orderProduct: EditOrderProduct[]
  payment: EditPayment[]
  cor_forminhas: string
  observations: string
  total: number
  delivery: boolean
  status: 'RASCUNHO' | 'ANOTADO' | 'EM_PRODUCAO' | 'ENTREGUE' | 'CANCELADO'
}
