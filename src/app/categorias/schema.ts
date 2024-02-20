import { z } from 'zod'

export const schema = z.object({
  name: z.string().min(4, 'A categoria deve ter pelo menos 4 caracteres.'),
})
