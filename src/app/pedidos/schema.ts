import { z } from 'zod'

enum CakeRules {
  MAIOR_PESO_REDONDO = 4,
  MAIOR_PESO_QUADRADO = 6,
  MENOR_PESO_QUADRADO = 2.5,
}

const payment = z.array(
  z
    .object({
      formPayment: z.enum(['DINHEIRO', 'CARTAO_DE_CREDITO', 'CARTAO_DE_DEBITO', 'PIX', 'DUPLICATA']),
      value: z.coerce.number().step(0.01),
      paid: z.coerce.boolean(),
      date: z.coerce.date().optional(),
    })
    .refine(
      (fields) => {
        if (fields.paid === true) {
          return !!fields.date
        }
        return true
      },
      { message: 'Data deve ser preenchida.', path: ['date'] },
    )
    .refine(
      (fields) => {
        if (fields.paid === true) {
          return !!fields.value
        }
        return true
      },
      { message: 'Valor deve ser preenchido.', path: ['value'] },
    ),
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
    banner: z.string({ required_error: 'A imagem do bolo é obrigatória.' }).optional(),
  })
  .optional()

const cakes = z.array(
  z
    .object({
      id: z.string().optional(),
      peso: z.coerce.number().optional(),
      recheios,
      formato: z.enum(['REDONDO', 'QUADRADO']),
      massa: z.enum(['BRANCA', 'CHOCOLATE', 'MASSA_MESCLADA']).optional(),
      cobertura: z.enum(['CHANTILLY', 'AVELA_BATIDO', 'NATA', 'CLARA_QUEIMADA']).optional(),
      decoracao: z.string().optional(),
      banner: z.string({ required_error: 'A imagem do bolo é obrigatória.' }).optional(),
      topper,
      tem_topper: z.coerce.boolean().optional(),
      price: z.coerce.number().optional(),
    })
    .refine(
      (fields) => {
        if (fields.tem_topper) {
          return !!fields.topper.tema
        }

        return true
      },
      { message: 'O tema do topper é obrigatório.', path: ['topper.tema'] },
    )
    .refine(
      (fields) => {
        if (fields.peso < CakeRules.MENOR_PESO_QUADRADO) {
          return fields.formato === 'REDONDO'
        }
        return true
      },
      { message: 'Para esse peso de bolo, o formato deve ser redondo.', path: ['peso'] },
    )
    .refine(
      (fields) => {
        if (fields.peso > CakeRules.MAIOR_PESO_REDONDO) {
          return fields.formato === 'QUADRADO'
        }
        return true
      },
      {
        message: 'Para esse peso de bolo, o formato deve ser quadrado.',
        path: ['peso'],
      },
    ),
)

const status = z.enum(['RASCUNHO', 'ANOTADO', 'EM_PRODUCAO', 'ENTREGUE', 'CANCELADO'])

export type StatusProps = z.infer<typeof status>

export const schema = z
  .object({
    id: z.string().optional(),
    date: z.coerce.date(),
    hour: z.string(),
    cor_forminhas: z.string().optional(),
    observations: z.string(),
    total: z.coerce.number().step(0.01),
    delivery: z.boolean(),
    status,
    client: z.object({ id: z.string() }),

    cakes,
    orderProduct,
    docesPP: z
      .array(
        z.object({
          id: z.string().optional(),
          product_id: z.string(),
          quantity: z.coerce.number(),
          price: z.coerce.number(),
          total: z.coerce.number(),
        }),
      )
      .refine(
        (fields) => {
          const count = fields.reduce((acc, item) => {
            if (item.quantity > 0) {
              return acc + item.quantity
            }
            return acc
          }, 0)

          return count % 25 === 0
        },
        { message: 'A quantidade de doces está fora do padrão', path: ['0.quantity'] },
      ),
    logistic: z.enum(['FRETE_CARRO', 'FRETE_MOTO']).optional(),
    value_frete: z.coerce.number().step(0.01).optional(),
    address: z.string().optional(),
    payment,
  })
  .refine(
    (fields) => {
      if (fields.delivery) {
        return !!fields.logistic
      }

      return true
    },
    { message: 'Logística deve ser preenchida.', path: ['logistic'] },
  )
  .refine(
    (fields) => {
      if (fields.cakes?.length > 0 && fields.delivery) {
        return fields.logistic === 'FRETE_CARRO'
      }

      return true
    },
    { message: 'Se bolo for para entrega, a logística deve ser FRETE_CARRO', path: ['logistic'] },
  )
