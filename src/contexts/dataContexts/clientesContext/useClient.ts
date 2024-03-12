import { ClientProps } from '@/app/clientes/types'
import { api } from '@/services/api/apiClient'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useClient = () => {
  const [clients, setClients] = useState<ClientProps[]>([])

  const getAllClients = async () => {
    api
      .get('/client')
      .then((response) => {
        setClients(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addClient = async ({ address_id, ...client }: ClientProps): Promise<AxiosResponse> => {
    const response = await api.post('/client', client, { params: { address_id } })

    return response
  }

  const removeClient = async (client_id: string): Promise<void> => {
    await api
      .delete('/client', { params: { id: client_id } })
      .then(() => {
        getAllClients()
      })
      .catch((error) => {
        toast.error(error.response.data?.error)
      })
  }

  const editClient = async ({ id, ...client }: ClientProps): Promise<AxiosResponse> => {
    const response = await api.patch('/client', client, { params: { id } })

    return response
  }
  return {
    clients,
    getAllClients,
    addClient,
    removeClient,
    editClient,
  }
}
