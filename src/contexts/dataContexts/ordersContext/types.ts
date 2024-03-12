import { OrderProps } from '@/app/pedidos/types'
import { AxiosResponse } from 'axios'

export interface OrdersContextData {
  orders: OrderProps[]
  getAllOrders: () => Promise<void>
  addOrder: (order: OrderProps) => Promise<AxiosResponse>
  removeOrder: (id: string) => Promise<AxiosResponse>
  editOrder: (order: OrderProps) => Promise<AxiosResponse>
}
