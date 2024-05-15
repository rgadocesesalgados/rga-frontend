export interface EditPayment {
  id: string
  type:
    | 'DINHEIRO'
    | 'PIX'
    | 'CARTAO_DE_CREDITO'
    | 'CARTAO_DE_DEBITO'
    | 'DUPLICATA'
  value: number
  paid: boolean
  date: Date
}
