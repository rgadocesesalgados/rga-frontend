import { api } from '@/services/api/apiClient'
import { CategoryProps } from '@/template/categorias/types'
import { AxiosResponse } from 'axios'
import { useState } from 'react'

export const useCategorys = () => {
  const [categorys, setCategorys] = useState<CategoryProps[]>([])

  const getAllCategorys = async () => {
    api
      .get('/category')
      .then((response) => {
        setCategorys(response.data)
        console.log('categorias: ', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addCategory = async (category: string): Promise<AxiosResponse> => {
    const response = await api.post('/category', {
      name: category,
    })

    return response
  }

  const removeCategory = async (category_name: string): Promise<AxiosResponse> => {
    const response = await api.delete('/category', { params: { name: category_name } })

    return response
  }

  const editCategory = async ({ id, name }: CategoryProps): Promise<AxiosResponse> => {
    const response = await api.patch('/category', { name }, { params: { id } })

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
