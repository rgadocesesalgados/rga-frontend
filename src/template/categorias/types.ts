import { z } from 'zod'
import { schema } from './schema'

export type FormDataCategorias = z.infer<typeof schema>

export interface CategoryProps {
  id?: string
  name: string
}
