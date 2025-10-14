import { api } from '@/services/api/apiClient'
import { OrdersResponse } from '@/services/orders'
import { EditOrder, GetOrder } from '@/types/order'
import { CreateOrder } from '@/types/order/create'
import { AxiosResponse } from 'axios'
import { useState } from 'react'

export const useOrders = () => {
  const [orders] = useState<GetOrder[]>([])

  const addOrder = async ({ client, ...data }: CreateOrder): Promise<OrdersResponse> => {
    const response = await api.post('/order', data, { params: { client_id: client.id, address_id: data.address.id } })

    return response.data
  }

  const removeOrder = async (order_id: string): Promise<AxiosResponse> => {
    const response = await api.delete('/order', { params: { order_id } })

    return response
  }

  const editOrder = async (order: EditOrder): Promise<OrdersResponse> => {
    const response = await api.patch('/order', order)

    return response.data as OrdersResponse
  }

  return {
    orders,
    addOrder,
    removeOrder,
    editOrder,
  }
}
