'use client'
import { Button } from '../Button'
import { InputSelectProps } from './types'
import { SconatainerOption, Soption } from './styles'
import { forwardRef } from 'react'
import { useStateInputSelect } from './states'

export const InputSelect = forwardRef<HTMLInputElement, InputSelectProps>(({ data, children, ...props }, ref) => {
  const { optionOpen, setOptionOpen } = useStateInputSelect()

  const handleOption = () => {
    setOptionOpen(false)
  }

  return (
    <div className="relative">
      <input type="text" ref={ref} {...props} className="border" readOnly hidden />
      {children}

      <SconatainerOption data-open={optionOpen}>
        {data.map(({ label, value }) => (
          <Soption key={value} onClick={handleOption}>
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
