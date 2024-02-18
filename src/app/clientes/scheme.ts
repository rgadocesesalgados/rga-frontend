import { z } from 'zod'

export const scheme = z.object({
  id: z.string().optional(),
  name: z.string().min(4, 'O nome deve ter pelo menos 4 caracteres.'),
  tel: z
    .string()
    .min(11, 'O telefone deve conter DDD e o digito 9.')
    .max(11, 'O telefone deve conter DDD e o digito 9.'),
  address_id: z.string(),
  inputSearch: z.string(),
})
