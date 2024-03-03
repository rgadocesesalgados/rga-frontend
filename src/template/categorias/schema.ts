import { z } from 'zod'

export const schema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(4, 'A categoria deve ter pelo menos 4 caracteres.'),
  })
  .required({ name: true })
