import { CategoryProps } from '@/template/categorias/types'
import { AxiosResponse } from 'axios'

export interface CategorysContextData {
  categorys: CategoryProps[]
  getAllCategorys: () => Promise<CategoryProps[]>
  addCategory: (category: string, priority: number, boxes: number[]) => Promise<AxiosResponse>
  removeCategory: (category: string) => Promise<AxiosResponse>
  editCategory: (category: CategoryProps) => Promise<AxiosResponse>
}
