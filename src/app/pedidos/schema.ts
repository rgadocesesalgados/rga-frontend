import { z } from 'zod'

const payment = z.array(
  z.object({
    formPayment: z.enum(['DINHEIRO', 'CARTAO_DE_CREDITO', 'CARTAO_DE_DEBITO', 'PIX', 'DUPLICATA']),
    value: z.coerce.number().step(0.01),
    paid: z.coerce.boolean(),
  }),
)

const orderProduct = z.array(
  z.array(
    z.object({
      id: z.string().optional(),
      product_id: z.string(),
      quantity: z.coerce.number(),
      price: z.coerce.number(),
      total: z.coerce.number(),
    }),
  ),
)

const recheios = z.array(z.object({ id: z.string(), price: z.coerce.number() }))

const topper = z
  .object({
    id: z.string().optional(),
    tema: z.string().optional(),
    name: z.string().optional(),
    idade: z.coerce.number().optional(),
    price: z.coerce.number().optional(),
    description: z.string().optional(),
    banner: z.string().optional(),
  })
  .optional()

const cakes = z.array(
  z.object({
    id: z.string().optional(),
    peso: z.coerce.number().optional(),
    recheios,
    massa: z.string().optional(),
    cobertura: z.string().optional(),
    decoracao: z.string().optional(),
    banner: z.string().optional(),
    topper,
    price: z.coerce.number().optional(),
  }),
)

const status = z.enum(['RASCUNHO', 'ANOTADO', 'EM_PRODUCAO', 'ENTREGUE', 'CANCELADO'])

export type StatusProps = z.infer<typeof status>

export const schema = z.object({
  id: z.string().optional(),
  client: z.string(),
  data: z.coerce.date(),
  hour: z.string(),
  cakes,
  orderProduct,
  cor_forminhas: z.string().min(4, 'A cor da forminha deve ter pelo menos 4 caracteres.').optional(),
  delivery: z.boolean(),
  logistic: z.enum(['FRETE_CARRO', 'FRETE_MOTO']).optional(),
  value_frete: z.coerce.number().step(0.01).optional(),
  address: z.string().optional(),
  observations: z.string(),
  payment,
  total: z.coerce.number().step(0.01),
  status,
})
