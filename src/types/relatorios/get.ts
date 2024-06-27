import { GetBolos } from './bolos/get'
import { GetProdutos, GetToppers } from '../relatorios'

export interface GetRelatorio {
  // client: string
  // tel: string
  // date: Date
  // hour: string
  // delivery: boolean
  // adress: {
  //   address_complete: string
  //   type_frete: 'FRETE_MOTO' | 'FRETE_CARRO'
  //   value_frete: number
  // } | null
  bolos: GetBolos[]
  toppers: GetToppers[]
  produtos: GetProdutos[]
  docesPP: {
    client: string
    date: Date
    hour: string
    type_frete?: 'FRETE_CARRO' | 'FRETE_MOTO'
    products: { name: string; quantity: number }[]
  }[]
  // cor_forminhas: string
  // observations: string
  // total: number
  // status: 'RASCUNHO' | 'ANOTADO' | 'EM_PRODUCAO' | 'ENTREGUE' | 'CANCELADO'
  // payment: {
  //   type: 'DINHEIRO' | 'PIX' | 'CARTAO_DE_CREDITO' | 'CARTAO_DE_DEBITO' | 'DUPLICATA'
  //   value: number
  //   paid: boolean
  // }
}
