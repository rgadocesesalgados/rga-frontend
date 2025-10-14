import { OrdersResponse } from '@/services/orders'
import { EditOrder, GetOrder } from '@/types/order'
import { CreateOrder } from '@/types/order/create'
import { AxiosResponse } from 'axios'

export interface OrdersContextData {
  orders: GetOrder[]
  addOrder: (order: CreateOrder) => Promise<OrdersResponse>
  removeOrder: (id: string) => Promise<AxiosResponse>
  editOrder: (order: EditOrder) => Promise<OrdersResponse>
}
