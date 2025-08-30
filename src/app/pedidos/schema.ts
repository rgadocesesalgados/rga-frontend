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
  z
    .array(
      z.object({
        id: z.string().optional(),
        product_id: z.string(),
        quantity: z.coerce.number(),
        price: z.coerce.number(),
        total: z.coerce.number(),
      }),
    )
    .default([]),
)

const recheios = z.array(z.object({ id: z.string(), price: z.coerce.number(), price_fixed: z.coerce.boolean() }))

const topper = z
  .object({
    id: z.string().optional(),
    tema: z.string().optional(),
    name: z.string().optional(),
    idade: z.coerce.number().optional(),
    price: z.coerce.number().optional(),
    description: z.string().optional(),
    banner: z.string({ required_error: 'A imagem do bolo é obrigatória.' }).optional(),
    recebido: z.boolean().optional(),
    fornecedor: z.enum(['FORNECEDOR_PRINCIPAL', 'FORNECEDOR_SECUNDARIO']).default('FORNECEDOR_PRINCIPAL'),
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
      cobertura: z.enum(['CHANTILLY', 'AVELA_BATIDO', 'NATA', 'CLARA_QUEIMADA', 'KIT_KAT']).optional(),
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
    ),
)

const status = z.enum(['RASCUNHO', 'ANOTADO', 'EM_PRODUCAO', 'ENTREGUE', 'CANCELADO', 'ORCAMENTO'])

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
    boxes: z
      .array(
        z.array(
          z
            .object({
              size: z.coerce.number().int(),
              products: z.array(
                z.object({
                  product_id: z.string({ errorMap: () => ({ message: 'Produto é obrigatório' }) }),
                  quantity: z.coerce.number({ errorMap: () => ({ message: 'Quatidade inválida' }) }),
                  price: z.coerce.number({ errorMap: () => ({ message: 'Preço inválido' }) }),
                  total: z.coerce.number({ errorMap: () => ({ message: 'Total inválido' }) }),
                }),
              ),
            })
            .refine(
              (field) => {
                const quantity = field?.products?.reduce((acc, item) => acc + (+item?.quantity || 0), 0)

                return quantity === field.size
              },
              { message: 'Quantidade inválida para a caixa.', path: ['size'] },
            ),
        ),
      )

      .default([]),
    cakes,
    orderProduct,
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
  .superRefine(({ status, cakes }, ctx) => {
    if (status === 'EM_PRODUCAO') {
      return
    }

    cakes.forEach((cake, index) => {
      if (cake.peso < CakeRules.MENOR_PESO_QUADRADO && cake.formato === 'QUADRADO') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Para esse peso de bolo, o formato deve ser redondo.`,
          path: ['cakes', index, 'peso'],
        })
      }

      if (cake.peso > CakeRules.MAIOR_PESO_REDONDO && cake.formato === 'REDONDO') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Para esse peso de bolo, o formato deve ser quadrado.`,
          path: ['cakes', index, 'peso'],
        })
      }
    })
  })
