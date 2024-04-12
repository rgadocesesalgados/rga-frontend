import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { CheckedState } from '@radix-ui/react-checkbox'
import { ChangeEvent } from 'react'
import { Control, Path } from 'react-hook-form'

interface CheckboxFormProps<Tdata> {
  control: Control<Tdata>
  name: Path<Tdata>
  label: string
  description?: string
  showMessageError?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export function CheckboxForm<Tdata>({
  control,
  name,
  label,
  showMessageError,
  description,
  onChange,
}: CheckboxFormProps<Tdata>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={{ onChange }}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex flex-col gap-2 rounded-md border p-5">
            <div className="flex items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value as CheckedState} onCheckedChange={field.onChange} />
              </FormControl>
              {label}
            </div>
            {description && <FormDescription>{description}</FormDescription>}
            {showMessageError && <FormMessage />}
          </FormLabel>
        </FormItem>
      )}
    />
  )
}
