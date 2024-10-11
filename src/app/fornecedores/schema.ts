import { z } from 'zod'

export const schema = z.object({ name: z.string(), tel: z.string().transform((tel) => tel.replace(/\D/g, '')) })

export type Supplier = z.infer<typeof schema>
