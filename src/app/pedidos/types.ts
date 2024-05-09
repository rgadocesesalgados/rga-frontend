import { Path } from 'react-hook-form'
import { z } from 'zod'
import { schema } from './schema'

export type FormDataPedidos = z.infer<typeof schema>

export type FormDataPedidosPath = Path<FormDataPedidos>

export interface CakeProps {
  id: string
  order_id: string
  peso: number
  formato: 'REDONDO' | 'QUADRADO'
  massa: 'BRANCA' | 'CHOCOLATE' | 'MASSA_MESCLADA'
  recheio: { id: string; price: number; name: string }[]
  cobertura: 'CHANTILLY' | 'AVELA_BATIDO' | 'NATA' | 'CLARA_QUEIMADA'
  price: number
  description: string
  banner: string
  topper?: Omit<TopperProps, 'id'>
}

export interface TopperProps {
  id: string
  tema: string
  name: string
  idade: number
  price: number
  description: string
  banner: string
}

export interface OrderProps {
  id: string
  client_name: string
  client_tel: string
  client_id: string
  date: Date
  hour: string
  bolos?: Omit<CakeProps, 'order_id' | 'id'>[]
  products: OrderProductProps[]
  cor_da_forminha: string
  observations: string
  delivery: boolean
  address: string
  address_id: string
  frete: 'FRETE_CARRO' | 'FRETE_MOTO'
  value_frete: number
  status: 'RASCUNHO' | 'ANOTADO' | 'EM_PRODUCAO' | 'ENTREGUE' | 'CANCELADO'
  total: number
}

export interface OrderProductProps {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_price: number
  quantity: number
  price: number
}
