import { api } from '@/services/api/apiClient'
import { FormDataCliente } from '../types'

interface GetClientesProps {
  setData: (data: FormDataCliente[]) => void
}
export const getClientes = ({ setData }: GetClientesProps) => {
  api
    .get('/client')
    .then((response) => {
      setData(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
