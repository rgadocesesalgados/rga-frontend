import { ProductProps } from '@/app/produtos/types'
import { AxiosResponse } from 'axios'

export interface ProductContextData {
  products: ProductProps[]
  getAllProducts: () => Promise<void>
  addProduct: (prodcut: Omit<ProductProps, 'id'>) => Promise<AxiosResponse>
  removeProduct: (prodcut_id: string) => Promise<AxiosResponse>
  editProduct: (prodcut: ProductProps) => Promise<AxiosResponse>
}
