import { GetRecheio } from '../recheio'
import { GetTopper } from '../topper'

export interface GetCake {
  id: string
  peso: number
  formato: 'REDONDO' | 'QUADRADO'
  massa: 'BRANCA' | 'CHOCOLATE' | 'MASSA_MESCLADA'
  recheio: GetRecheio[]
  price: number
  cobertura: 'CHANTILLY' | 'AVELA_BATIDO' | 'NATA' | 'CLARA_QUEIMADA' | 'KIT_KAT'
  description: string
  banner: string
  topper: GetTopper
}
