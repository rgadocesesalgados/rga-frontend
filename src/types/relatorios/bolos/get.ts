import { GetOrder } from '@/types/order'

export interface GetBolos {
  order_id: string
  client: string
  status_order: GetOrder['status']
  date: Date
  hour: string
  peso: number
  formato: 'QUADRADO' | 'REDONDO'
  massa: 'BRANCA' | 'CHOCOLATE' | 'MASSA_MESCLADA'
  recheio: { name: string }[]
  cobertura: 'CHANTILLY' | 'AVELA_BATIDO' | 'NATA' | 'CLARA_QUEIMADA'
  description: string
  banner: string
  topper: {
    name: string
    description: string
    banner: string
    tema: string
    idade: number
    price: number
  }
}
