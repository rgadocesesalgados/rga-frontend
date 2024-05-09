import { GetAddress } from '../address/get'

export interface GetAddressOrder extends GetAddress {
  type_frete: 'FRETE_MOTO' | 'FRETE_CARRO'
  value_frete: number
}
