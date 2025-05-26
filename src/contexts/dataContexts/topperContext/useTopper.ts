import { Tooper } from '@/app/toppers/[fornecedor]/page'
import { api } from '@/services/api/apiClient'
import { useState } from 'react'

export const useTopper = () => {
  const [topper, setTopper] = useState<Tooper[]>([])

  const getAllTopper = async () => {
    await api
      .get('/topper')
      .then((response) => {
        console.log('toppers: ', response.data)
        setTopper(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return {
    topper,
    getAllTopper,
  }
}
