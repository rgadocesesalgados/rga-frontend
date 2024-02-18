import { z } from 'zod'
import { scheme } from './scheme'

export type FormDataCliente = z.infer<typeof scheme>
