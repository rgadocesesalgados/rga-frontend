import { DatePickerDemo } from '@/components/ui/date-picker'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control, Path } from 'react-hook-form'

interface DatePickerProps<Tdata> {
  control: Control<Tdata>
  name: Path<Tdata>
  label?: string
  description?: string
  showMessageError?: boolean
}
export function DatePickerForm<Tdata>({ control, name, label, description, showMessageError }: DatePickerProps<Tdata>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <DatePickerDemo value={field.value as Date} onChange={field.onChange} />
          </FormControl>
          {description && <FormDescription>{description}.</FormDescription>}
          {showMessageError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
