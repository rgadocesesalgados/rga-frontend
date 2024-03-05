import { ClientProps } from '@/app/clientes/types'
import { AxiosResponse } from 'axios'

export interface ClientContextData {
  clients: ClientProps[]
  getAllClients: () => Promise<void>
  addClient: (client: ClientProps) => Promise<AxiosResponse>
  removeClient: (client_id: string) => Promise<AxiosResponse>
  editClient: (client: ClientProps) => Promise<AxiosResponse>
}
