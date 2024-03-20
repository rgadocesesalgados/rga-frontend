import { z } from 'zod'

export const schema = z.object({
  id: z.string().optional(),
  searchClient: z.string(),
  client: z.string(),
  data: z.coerce.date(),
  orderProduct: z.array(
    z.array(
      z.object({
        id: z.string().optional(),
        product_id: z.string(),
        quantity: z.coerce.number(),
        price: z.coerce.number().step(0.01),
        search: z.string(),
      }),
    ),
  ),
  cor_forminhas: z.string().min(4, 'A cor da forminha deve ter pelo menos 4 caracteres.'),
  delivery: z.boolean(),
  searchAddress: z.string().optional(),
  logistic: z.enum(['FRETE_CARRO', 'FRETE_MOTO']).optional(),
  value_frete: z.coerce.number().step(0.01).optional(),
  address: z.string().optional(),
  observations: z.string(),
  payment: z.array(
    z.object({
      formPayment: z.enum(['DINHEIRO', 'CARTAO_DE_CREDITO', 'CARTAO_DE_DEBITO', 'PIX', 'DUPLICATA']),
      value: z.coerce.number().step(0.01),
      paid: z.coerce.boolean(),
    }),
  ),
  total: z.coerce.number().step(0.01),
  status: z.enum(['RASCUNHO', 'ANOTADO', 'EM_PRODUCAO', 'ENTREGUE', 'CANCELADO']),
})
