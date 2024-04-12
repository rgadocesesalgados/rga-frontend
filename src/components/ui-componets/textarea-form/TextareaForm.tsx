import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control, Path } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'

export interface TextareaProps<Tdata> extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  control: Control<Tdata>
  name: Path<Tdata>
  label?: string
  description?: string
  showMessageError?: boolean
}
export function TextareaForm<Tdata>({
  control,
  name,
  label,
  description,
  showMessageError = false,
  onChange,
  ...props
}: TextareaProps<Tdata>) {
  return (
    <FormField
      rules={{ onChange }}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl {...field}>
            <Textarea {...props} />
          </FormControl>
          {showMessageError && <FormMessage />}
          {description && <FormDescription>{description}.</FormDescription>}
        </FormItem>
      )}
    />
  )
}
