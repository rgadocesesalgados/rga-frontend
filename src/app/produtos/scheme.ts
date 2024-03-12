import { z } from 'zod'

export const scheme = z.object({
  id: z.string().optional(),
  name: z.string().min(4, 'O nome deve ter pelo menos 4 caracteres.'),
  category_name: z.string(),
  inputSearch: z.string(),
  price: z.coerce.number().positive().step(0.01),
  min_quantity: z.coerce.number().positive(),
  banner_url: z.string().url('A imagem deve ser uma URL.').optional(),
})
