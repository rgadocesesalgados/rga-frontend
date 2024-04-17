import { ClientAddRequest, ClientEditRequest, ClientProps } from '@/app/clientes/types'
import { AxiosResponse } from 'axios'

export interface ClientContextData {
  clients: ClientProps[]
  getAllClients: () => Promise<void>
  addClient: (client: ClientAddRequest) => Promise<AxiosResponse>
  removeClient: (client_id: string) => Promise<void>
  editClient: (client: ClientEditRequest) => Promise<AxiosResponse>
}
