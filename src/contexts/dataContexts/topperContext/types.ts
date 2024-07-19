import { Tooper } from '@/app/toppers/page'

export interface TopperContextData {
  topper: Tooper[]
  getAllTopper: () => Promise<void>
}
