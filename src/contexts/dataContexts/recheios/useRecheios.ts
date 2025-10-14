import { RecheioPropsRequestToCreate, RecheioPropsRequestToEdit, RecheiosProps } from '@/app/recheios/types'
import { api } from '@/services/api/apiClient'
import { useState } from 'react'

export const useRecheios = () => {
  const [recheios, setRecheios] = useState<RecheiosProps[]>([])
  const getAllRecheios = async () => {
    const response = await api.get('/recheio')

    setRecheios(response.data)

    return response.data
  }
  const addRecheio = async (recheio: RecheioPropsRequestToCreate) => {
    const response = await api.post('/recheio', recheio)

    return response
  }
  const removeRecheio = async (recheio_id: string) => {
    const response = await api.delete('/recheio', { params: { id: recheio_id } })

    return response
  }
  const editRecheio = ({ id, ...recheio }: RecheioPropsRequestToEdit) => {
    const response = api.patch('/recheio', recheio, { params: { id } })

    return response
  }
  return {
    recheios,
    getAllRecheios,
    addRecheio,
    removeRecheio,
    editRecheio,
  }
}
