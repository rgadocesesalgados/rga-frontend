import { z } from 'zod'

export const schema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(4, 'A categoria deve ter pelo menos 4 caracteres.'),
    priority: z.coerce.number({ required_error: 'Priridade é obrigatória' }),
    boxes: z.array(z.object({ size: z.coerce.number().min(0, 'O minimo é 0 ') })),
  })
  .required({ name: true })
