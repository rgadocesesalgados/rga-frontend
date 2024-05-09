import { Payment } from '@prisma/client'

export interface PaymentCreate
  extends Pick<Payment, 'type' | 'value' | 'paid' | 'date'> {}
