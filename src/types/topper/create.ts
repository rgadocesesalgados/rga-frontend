import { Topper } from '@prisma/client'

export interface TopperCreate
  extends Pick<
    Topper,
    'tema' | 'name' | 'idade' | 'price' | 'description' | 'banner'
  > {}
