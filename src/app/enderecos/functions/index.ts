import { api } from '@/services/api/apiClient'
import { FormData } from '../types'

interface GetEnderecosProps {
  setData: (data: FormData[]) => void
}
export const getEnderecos = ({ setData }: GetEnderecosProps) => {
  api
    .get('/address')
    .then((response) => {
      setData(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
