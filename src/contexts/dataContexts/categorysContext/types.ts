import { CategoryProps } from '@/template/categorias/types'
import { AxiosResponse } from 'axios'

export interface CategorysContextData {
  categorys: CategoryProps[]
  getAllCategorys: () => Promise<void>
  addCategory: (category: string) => Promise<AxiosResponse>
  removeCategory: (category: string) => Promise<AxiosResponse>
  editCategory: (category: CategoryProps) => Promise<AxiosResponse>
}
