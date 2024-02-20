import { z } from 'zod'
import { schema } from './schema'

export type FormDataCategorias = z.infer<typeof schema>
