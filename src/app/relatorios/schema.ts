import { z } from 'zod'

export const schema = z.object({
  dateInitial: z.coerce.date(),
  dateFinal: z.coerce.date(),
  status: z.array(z.object({ value: z.enum(['RASCUNHO', 'ANOTADO', 'EM_PRODUCAO', 'ENTREGUE', 'CANCELADO']) })),
})
