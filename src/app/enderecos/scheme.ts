import { z } from 'zod'

export const schema = z.object({
  id: z.string().optional(),
  rua: z.string().min(4, 'A categoria deve ter pelo menos 4 caracteres.'),
  numero: z.coerce
    .number({ errorMap: () => ({ message: 'Número inválido.' }) })
    .int('O número deve ser um inteiro.')
    .min(0, 'O número deve ser positivo.'),
  bairro: z.string().min(4, 'O bairro deve ter pelo menos 4 caracteres.'),
  ponto_de_referencia: z.string().min(4, 'O ponto de referência deve ter pelo menos 4 caracteres.'),
  cidade: z
    .string({ errorMap: () => ({ message: 'Cidade inválida.' }) })
    .min(4, 'A cidade deve ter pelo menos 4 caracteres.'),
})
