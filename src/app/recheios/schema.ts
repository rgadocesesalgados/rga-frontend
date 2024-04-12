import { z } from 'zod'

export const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(4, 'O nome deve ter pelo menos 4 caracteres.'),
  price: z.coerce.number().min(0.01, 'O preço deve ser maior que 0.'),
  is_pesado: z.boolean().default(false),
  to_bento_cake: z.boolean().default(true),
  banner: z.string().optional(),
})
