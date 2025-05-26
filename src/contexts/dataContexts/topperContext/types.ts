import { Tooper } from '@/app/toppers/[fornecedor]/page'

export interface TopperContextData {
  topper: Tooper[]
  getAllTopper: () => Promise<void>
}
