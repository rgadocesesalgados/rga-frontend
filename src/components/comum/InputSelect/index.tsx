'use client'

import Input from '../Input'
import { SconatainerOption } from './styles'
import { filterLabel } from '@/app/utils/filterLabel'
import Option from './Option'
import { InputSelectProps } from './types'
import { useFormContext } from 'react-hook-form'
import { useStateInputSelect } from './states'

export const InputSelect = ({ data, label, placeholder, error, inputid, inputSearch }: InputSelectProps) => {
  const { optionOpen, setOptionOpen } = useStateInputSelect()
  const { register, watch, setValue, setFocus } = useFormContext()

  const options = filterLabel(data, watch(inputSearch))

  const focus = (index: number) => {
    document.getElementById(`${inputid}-${index}`)?.focus()
  }
  return (
    <div className="relative w-full">
      <Input {...register(inputid)} readOnly error={error} hidden />

      <Input
        type="search"
        placeholder={placeholder}
        label={label}
        autoComplete="off"
        {...register(inputSearch)}
        onClick={() => setOptionOpen(true)}
        onKeyDown={(e) => {
          setOptionOpen(true)
          if (e.key === 'ArrowDown') {
            focus(0)
          }
          if (e.key === 'Escape') {
            setOptionOpen(false)
          }
          if (e.key === 'Enter') {
            setOptionOpen(false)
          }
        }}
        error={error}
      />

      <SconatainerOption data-open={optionOpen}>
        {options?.map(({ label, value }, index) => {
          return (
            <Option
              id={`${inputid}-${index}`}
              key={label}
              label={label}
              onClick={() => {
                setValue(inputid, value)
                setValue(inputSearch, label)
                setOptionOpen(!optionOpen)
                setFocus(inputSearch)
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  focus(index + 1)
                }

                if (e.key === 'ArrowUp') {
                  focus(index - 1)
                }

                if (e.key === 'Escape') {
                  setOptionOpen(!optionOpen)
                  setFocus(inputSearch)
                }
                if (e.key === 'Tab') {
                  setOptionOpen(!optionOpen)
                  setFocus(inputSearch)
                }
              }}
            />
          )
        })}
      </SconatainerOption>
    </div>
  )
}
