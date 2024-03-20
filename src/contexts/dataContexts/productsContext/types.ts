import { ProductProps, ProductPropsRequestToCreate, ProductPropsRequestToEdit } from '@/app/produtos/types'
import { AxiosResponse } from 'axios'

export interface ProductContextData {
  products: ProductProps[]
  getAllProducts: () => Promise<void>
  addProduct: (prodcut: ProductPropsRequestToCreate) => Promise<AxiosResponse>
  removeProduct: (prodcut_id: string) => Promise<AxiosResponse>
  editProduct: (prodcut: ProductPropsRequestToEdit) => Promise<AxiosResponse>
}
