import { OrderProps } from '@/app/pedidos/types'
import { GetOrder } from '@/types/order'
import { CreateOrder } from '@/types/order/create'
import { AxiosResponse } from 'axios'

export interface OrdersContextData {
  orders: GetOrder[]
  getAllOrders: () => Promise<void>
  addOrder: (order: CreateOrder) => Promise<AxiosResponse>
  removeOrder: (id: string) => Promise<AxiosResponse>
  editOrder: (order: OrderProps) => Promise<AxiosResponse>
}
