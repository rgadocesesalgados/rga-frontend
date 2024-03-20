import { ProductProps, ProductPropsRequestToCreate } from '@/app/produtos/types'
import { api } from '@/services/api/apiClient'
import { AxiosResponse } from 'axios'
import { useState } from 'react'

export const useProduct = () => {
  const [products, setProducts] = useState<ProductProps[]>([])

  const getAllProducts = async () => {
    api
      .get('/product')
      .then((response) => {
        console.log('produtos: ', response.data)
        setProducts(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addProduct = async ({ category_id, ...poduct }: ProductPropsRequestToCreate): Promise<AxiosResponse> => {
    const response = await api.post('/product', poduct, { params: { category_id } })

    return response
  }

  const removeProduct = async (prodcut_id: string): Promise<AxiosResponse> => {
    const response = await api.delete('/product', { params: { id: prodcut_id } })

    return response
  }

  const editProduct = async ({ category_name, ...prodcut }: ProductProps): Promise<AxiosResponse> => {
    const response = await api.patch('/product', prodcut, { params: { category_name } })

    return response
  }
  return {
    products,
    getAllProducts,
    addProduct,
    removeProduct,
    editProduct,
  }
}
