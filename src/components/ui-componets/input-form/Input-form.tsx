import { Input } from '@/components/ui/input'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control, Path } from 'react-hook-form'

export interface InputProps<Tdata> extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<Tdata>
  name: Path<Tdata>
  label?: string
  description?: string
  showMessageError?: boolean
}
export function InputForm<Tdata>({
  control,
  name,
  label,
  description,
  showMessageError = false,
  className,
  onChange,
  ...props
}: InputProps<Tdata>) {
  return (
    <FormField
      rules={{ onChange }}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl {...field}>
            <Input {...props} />
          </FormControl>
          {showMessageError && <FormMessage />}
          {description && <FormDescription>{description}.</FormDescription>}
        </FormItem>
      )}
    />
  )
}
