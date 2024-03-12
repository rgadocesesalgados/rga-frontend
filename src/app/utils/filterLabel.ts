import { OptionProps } from '@/components/comum/InputSelect/types'

export const filterLabel = (data: OptionProps[], watch: string) => {
  const result = data?.filter(({ label }) => {
    const labelNormalized = label?.toUpperCase().replace(' ', '')
    const inputSearchNormalized = watch?.toUpperCase().replace(' ', '')

    return labelNormalized.match(inputSearchNormalized)
  })

  return result
}
