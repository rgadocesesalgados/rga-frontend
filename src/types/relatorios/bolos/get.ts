export interface GetBolos {
  client: string
  date: Date
  hour: string
  peso: number
  formato: 'QUADRADO' | 'REDONDO'
  massa: 'BRANCA' | 'CHOCOLATE' | 'MASSA_MESCLADA'
  recheio: { name: string }[]
  description: string
}
