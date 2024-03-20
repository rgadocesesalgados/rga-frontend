import { OrderProps, OrderRequestToCreate } from '@/app/pedidos/types'
import { AxiosResponse } from 'axios'

export interface OrdersContextData {
  orders: OrderProps[]
  getAllOrders: () => Promise<void>
  addOrder: (order: OrderRequestToCreate) => Promise<AxiosResponse>
  removeOrder: (id: string) => Promise<AxiosResponse>
  editOrder: (order: OrderProps) => Promise<AxiosResponse>
}
