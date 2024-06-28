import { api } from '@/services/api/apiClient'
import { EditOrder, GetOrder } from '@/types/order'
import { CreateOrder } from '@/types/order/create'
import { AxiosResponse } from 'axios'
import { useState } from 'react'

export const useOrders = () => {
  const [orders, setOrders] = useState<GetOrder[]>([])

  const getAllOrders = async (all = false) => {
    api
      .get('/order', { params: { all } })
      .then((response) => {
        setOrders(response.data)
        console.log('pedidos: ', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addOrder = async ({ client, ...data }: CreateOrder): Promise<AxiosResponse> => {
    const response = await api.post('/order', data, { params: { client_id: client.id, address_id: data.address.id } })

    return response
  }

  const removeOrder = async (order_id: string): Promise<AxiosResponse> => {
    const response = await api.delete('/order', { params: { order_id } })

    return response
  }

  const editOrder = async (order: EditOrder): Promise<AxiosResponse> => {
    const response = await api.patch('/order', order)

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
