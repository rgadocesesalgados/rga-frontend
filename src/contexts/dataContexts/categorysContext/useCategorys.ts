import { api } from '@/services/api/apiClient'
import { CategoryProps } from '@/template/categorias/types'
import { AxiosResponse } from 'axios'
import { useState } from 'react'

export const useCategorys = () => {
  const [categorys, setCategorys] = useState<CategoryProps[]>([])

  const getAllCategorys = async () => {
    const response = await api.get('/category')

    setCategorys(response.data)
    return response.data
  }

  const addCategory = async (category: string, priority: number, boxes: number[]): Promise<AxiosResponse> => {
    const response = await api.post('/category', {
      name: category,
      priority,
      boxes,
    })

    return response
  }

  const removeCategory = async (category_id: string): Promise<AxiosResponse> => {
    const response = await api.delete('/category', { params: { id: category_id } })

    return response
  }

  const editCategory = async ({ id, name, priority, boxes }: CategoryProps): Promise<AxiosResponse> => {
    const response = await api.patch('/category', { name, priority, boxes }, { params: { id } })

    return response
  }

  return {
    categorys,
    getAllCategorys,
    addCategory,
    removeCategory,
    editCategory,
  }
}
