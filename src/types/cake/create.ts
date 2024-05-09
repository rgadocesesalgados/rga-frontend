import { GetRecheio } from '../recheio'
import { GetCake } from './get'

export interface CreateCake
  extends Pick<GetCake, 'peso' | 'formato' | 'massa' | 'price' | 'cobertura' | 'description' | 'banner' | 'topper'> {
  recheio: Pick<GetRecheio, 'id'>[]
  tem_topper: boolean
}
