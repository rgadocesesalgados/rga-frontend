import { z } from 'zod'
import { schema } from './scheme'

export type FormData = z.infer<typeof schema>
