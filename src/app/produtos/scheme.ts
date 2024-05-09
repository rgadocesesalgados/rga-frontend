import { z } from 'zod'

export const scheme = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: 'O nome é obrigatório.' }).min(4, 'O nome deve ter pelo menos 4 caracteres.'),
  category_id: z.string({ required_error: 'A categoria é obrigatória.' }),
  price: z.coerce.number({ required_error: 'O preço é obrigatório.' }).positive().step(0.01),
  min_quantity: z.coerce.number({ required_error: 'A quantidade mínima é obrigatória.' }).positive(),
  banner_url: z.string({ required_error: 'A imagem é obrigatória.' }).optional(),
})
