export interface OrderUniqueResponse {
  id?: string
  date: Date
  hour: string
  cor_forminhas?: string
  observations: string
  total: number
  delivery: boolean
  status: StatusProps
  client: Client
  boxes: Box[][]
  cakes: Cake[]
  orderProduct: OrderProductItem[][]
  logistic?: Logistic
  value_frete?: number
  address?: string
  address_id?: string
  payment: PaymentItem[]
}

type FormPayment = 'DINHEIRO' | 'CARTAO_DE_CREDITO' | 'CARTAO_DE_DEBITO' | 'PIX' | 'DUPLICATA'

type TopperFornecedor = 'FORNECEDOR_PRINCIPAL' | 'FORNECEDOR_SECUNDARIO'

type CakeFormato = 'REDONDO' | 'QUADRADO'

type CakeMassa = 'BRANCA' | 'CHOCOLATE' | 'MASSA_MESCLADA'

type CakeCobertura = 'CHANTILLY' | 'AVELA_BATIDO' | 'NATA' | 'CLARA_QUEIMADA' | 'KIT_KAT'

type StatusProps = 'RASCUNHO' | 'ANOTADO' | 'EM_PRODUCAO' | 'ENTREGUE' | 'CANCELADO' | 'ORCAMENTO'

type Logistic = 'FRETE_CARRO' | 'FRETE_MOTO'

interface PaymentItem {
  id: string
  formPayment: FormPayment
  value: number
  paid: boolean
  date?: Date
}

interface OrderProductItem {
  id?: string
  product_id: string
  quantity: number
  price: number
  total: number
  product: {
    name: string
  }
}

interface Recheio {
  id: string
  price: number
  price_fixed: boolean
  name: string
}

interface Topper {
  id?: string
  tema?: string
  name?: string
  idade?: number
  price?: number
  description?: string
  banner?: string
  recebido?: boolean
  fornecedor: TopperFornecedor
}

interface Cake {
  id?: string
  peso?: number
  recheios: Recheio[]
  formato: CakeFormato
  massa?: CakeMassa
  cobertura?: CakeCobertura
  decoracao?: string
  banner?: string
  topper?: Topper
  tem_topper?: boolean
  price?: number
}

interface BoxProduct {
  id: string
  name: string
  product_id: string
  quantity: number
  price: number
  total: number
}

export interface Box {
  id: string
  size: string
  products: BoxProduct[]
}

interface Client {
  id: string
  name: string
  tel: string
}
