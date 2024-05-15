import { EditTopper } from '../topper'

export interface EditCake {
  id: string
  peso: number
  formato: 'REDONDO' | 'QUADRADO'
  massa: 'BRANCA' | 'CHOCOLATE' | 'MASSA_MESCLADA'
  recheio: { id: string }[]
  price: number
  cobertura: 'CHANTILLY' | 'NATA' | 'CLARA_QUEIMADA' | 'AVELA_BATIDO'
  description: string
  banner: string
  topper: EditTopper
}
