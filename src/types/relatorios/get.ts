import { GetBolos } from './bolos/get'
import { GetProdutos, GetToppers } from '../relatorios'

export interface GetRelatorio {
  bolos: GetBolos[]
  toppers: GetToppers[]
  produtos: GetProdutos
  boxes: {
    id: string
    client: string
    date: Date
    hour: string
    delivery: boolean
    type_frete: 'FRETE_CARRO' | 'FRETE_MOTO'
    products: {
      id: string
      name: string
      quantity: number
    }[]
    size: number
  }[]
  orders: string[]
}
