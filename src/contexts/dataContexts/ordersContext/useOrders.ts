import { OrderProps, OrderRequestToCreate } from '@/app/pedidos/types'
import { api } from '@/services/api/apiClient'
import { AxiosResponse } from 'axios'
import { useState } from 'react'

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderProps[]>([])

  const getAllOrders = async () => {
    api
      .get('/order')
      .then((response) => {
        setOrders(response.data)
        console.log('pedidos: ', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addOrder = async ({ client_id, address_id, ...data }: OrderRequestToCreate): Promise<AxiosResponse> => {
    const response = await api.post('/order', data, { params: { client_id, address_id } })

    return response
  }

  const removeOrder = async (order_id: string): Promise<AxiosResponse> => {
    const response = await api.delete('/order', { params: { order_id } })

    return response
  }

  const editOrder = async ({ id, ...order }: OrderProps): Promise<AxiosResponse> => {
    const response = await api.patch('/order', order, { params: { id } })

    return response
  }

  return {
    orders,
    getAllOrders,
    addOrder,
    removeOrder,
    editOrder,
  }
}
