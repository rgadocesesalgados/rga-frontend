import { GetBolos } from './bolos/get'

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
  // products: {
  //   name: string
  //   quantity: number
  // }[]
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
