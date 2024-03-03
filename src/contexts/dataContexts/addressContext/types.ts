import { AddressProps } from '@/app/enderecos/types'
import { AxiosResponse } from 'axios'

export interface AddressContextData {
  address: AddressProps[]
  getAllAddresses: () => Promise<void>
  addAddress: (address: AddressProps) => Promise<AxiosResponse>
  removeAddress: (address_id: string) => Promise<AxiosResponse>
  editAddress: (address: AddressProps) => Promise<AxiosResponse>
}
