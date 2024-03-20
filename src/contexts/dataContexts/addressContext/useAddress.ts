import { AddressProps, AddressPropsRequestToCreate } from '@/app/enderecos/types'
import { api } from '@/services/api/apiClient'
import { AxiosResponse } from 'axios'
import { useState } from 'react'

export const useAddress = () => {
  const [address, setAddresses] = useState<AddressProps[]>([])
  const getAllAddresses = async () => {
    await api
      .get('/address')
      .then((response) => {
        setAddresses(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addAddress = async (address: AddressPropsRequestToCreate): Promise<AxiosResponse> => {
    const response = await api.post('/address', address)

    return response
  }

  const removeAddress = async (address_id: string): Promise<AxiosResponse> => {
    const response = await api.delete('/address', { params: { id: address_id } })

    return response
  }
  const editAddress = async ({ id, ...address }: AddressProps): Promise<AxiosResponse> => {
    const response = await api.patch('/address', address, { params: { id } })

    return response
  }
  return {
    address,
    getAllAddresses,
    addAddress,
    removeAddress,
    editAddress,
  }
}
