import { GetOrderProduct } from '.'

export interface CreateProductOrder extends Pick<GetOrderProduct, 'product_id' | 'quantity' | 'price' | 'total'> {}
