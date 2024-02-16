'use client'
import Input from '../Input'
import { Button } from '../Button'
import { useStateInputSearch } from './forms'
import { InputSelectProps, OptionProps } from './types'
import { SconatainerOption, Soption } from './styles'
import { forwardRef } from 'react'
import { useStateInputSelect } from './states'

export const InputSelect = forwardRef<HTMLInputElement, InputSelectProps>(({ data, setValueId, ...props }, ref) => {
  const { register, setValue, watch } = useStateInputSearch()
  const { optionOpen, setOptionOpen } = useStateInputSelect()

  const handleOption = ({ label, value }: OptionProps) => {
    setOptionOpen(false)
    setValue('inputSearch', label)
    setValueId(value)
  }

  const filter = () => {
    const filtradoPorLabel = data.filter(({ label }) => {
      const labelUpperCase = label.toUpperCase().replace(/\s/g, '')
      const inputSearchUpperCase = watch('inputSearch').toUpperCase().replace(/\s/g, '')

      return labelUpperCase.includes(inputSearchUpperCase)
    })

    return filtradoPorLabel
  }
  return (
    <div className="relative">
      <input type="text" ref={ref} {...props} className="border" readOnly hidden />

      <Input
        type="search"
        label="Encontre o endereço"
        {...register('inputSearch')}
        autoComplete="none"
        onClick={() => setOptionOpen(true)}
      />

      <SconatainerOption data-open={optionOpen}>
        {filter().map(({ label, value }) => (
          <Soption key={value} onClick={() => handleOption({ label, value })}>
            {label}
          </Soption>
        ))}
        <div>
          <Button type="button" color="green" className="w-full">
            Criar endereço
          </Button>
        </div>
      </SconatainerOption>
    </div>
  )
})

//
//

//     const select = watch('inputId')

//     const filter = () => {
//       const filtrado = data.filter(
//         (item) => true == item.label.toUpperCase().replace(' ', '').includes(select.toUpperCase().replace(' ', '')),
//       )
//       return filtrado
//     }

//

//     return (
//       <>
//         <Input
//           type="search"
//           label={label}
//           placeholder="Endereço"
//           autoComplete="none"
//           onFocus={() => setOptionOpen(true)}
//           onBlur={() => setOptionOpen(false)}
//           {...props}
//         />

//         <SconatainerOption data-open={optionOpen}>
//           {filter().map((item) => (
//             <Soption key={item.value} onClick={() => handleOption(item)}>
//               {item.label}
//             </Soption>
//           ))}

//
//         </SconatainerOption>

//         <input readOnly ref={ref} {...register('inputId')} />
//       </>
//     )
