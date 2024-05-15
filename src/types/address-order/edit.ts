export interface EditAddressOrder {
  address_id: string
  type_frete: 'FRETE_MOTO' | 'FRETE_CARRO'
  value_frete: number
}
