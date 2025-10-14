import { api } from '@/services/api/apiClient'
import { GetOrder } from '@/types/order'
import { AxiosResponse } from 'axios'
import { OrderUniqueResponse } from './type'

export const getOrder = async (id: string) => {
  const response = await api.get(`/v2/orders/${id}`)

  return response.data as OrderUniqueResponse
}

export const getOrders = async (page: number, take: number, query: string) => {
  const response = await api.get(`/v2/orders?page=${page}&take=${take}&query=${query}`)

  return response.data as OrdersResponse[]
}

export const getOrdersOrganization = async () => {
  const response = await api.get(`/v2/orders/organization`)

  return response.data as OrdersResponse[]
}

export interface OrdersResponse {
  id: string
  name: string
  paid: number
  status: GetOrder['status']
  date: string
  total: number
}

export const removeOrder = async (order_id: string): Promise<AxiosResponse> => {
  const response = await api.delete('/order', { params: { order_id } })

  return response
}

interface SetOrderStatus {
  status: OrdersResponse['status']
  ids: string[]
}
export const setOrderStatus = async ({ ids, status }: SetOrderStatus) => {
  const response = await api.patch('/relatorios', { ids, status })

  return response
}
