import { RecheioPropsRequestToCreate, RecheioPropsRequestToEdit, RecheiosProps } from '@/app/recheios/types'
import { AxiosResponse } from 'axios'

export interface RecheiosContextData {
  recheios: RecheiosProps[]
  getAllRecheios: () => Promise<void>
  addRecheio: (recheio: RecheioPropsRequestToCreate) => Promise<AxiosResponse>
  removeRecheio: (recheio_id: string) => Promise<AxiosResponse>
  editRecheio: (prodcut: RecheioPropsRequestToEdit) => Promise<AxiosResponse>
}
