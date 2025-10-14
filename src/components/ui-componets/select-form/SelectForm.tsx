'use client'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChangeEvent } from 'react'
import { Control, Path } from 'react-hook-form'

interface SelectFormProps<Tdata> {
  control: Control<Tdata>
  name: Path<Tdata>
  data: Option[]
  label?: string
  description?: string
  showMessageError?: boolean
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

interface Option {
  label: string
  value: string
}
export function SelectForm<Tdata>({
  control,
  name,
  label,
  data,
  description,
  showMessageError,
  onChange,
}: SelectFormProps<Tdata>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={{
        onChange,
      }}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={`${data.find(({ value }) => value === field.value)?.label ?? 'Selecione'}`}
                    defaultValue={`${field.value}`}
                  />
                </SelectTrigger>
                <FormControl>
                  <SelectContent>
                    {data.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </FormControl>
              </Select>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {showMessageError && <FormMessage />}
          </FormItem>
        )
      }}
    />
  )
}
