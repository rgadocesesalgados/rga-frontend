import { Path } from 'react-hook-form'
import { z } from 'zod'
import { schema } from './schema'

export type FormDataPedidos = z.infer<typeof schema>

export type FormDataPedidosPath = Path<FormDataPedidos>

export interface OrderProps {
  id: string
  client_name: string
  client_tel: string
  client_id: string
  data: Date
  bolos?: string
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

export interface OrderRequestToCreate
  extends Omit<OrderProps, 'id' | 'client_name' | 'client_tel' | 'address' | 'products'> {
  products: Omit<OrderProductProps, 'id' | 'product_name' | 'product_price' | 'order_id'>[]
}
