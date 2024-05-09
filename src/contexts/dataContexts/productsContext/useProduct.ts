import { ProductProps, ProductPropsRequestToCreate, ProductPropsRequestToEdit } from '@/app/produtos/types'
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

  const addProduct = async (poduct: ProductPropsRequestToCreate): Promise<AxiosResponse> => {
    const response = await api.post('/product', poduct)

    return response
  }

  const removeProduct = async (prodcut_id: string): Promise<AxiosResponse> => {
    const response = await api.delete('/product', { params: { id: prodcut_id } })

    return response
  }

  const editProduct = async ({ category_id, ...prodcut }: ProductPropsRequestToEdit): Promise<AxiosResponse> => {
    const response = await api.patch('/product', prodcut, { params: { category_id: category_id } })

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
