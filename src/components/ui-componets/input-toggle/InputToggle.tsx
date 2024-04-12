import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control, Path } from 'react-hook-form'

interface InputToggleProps<Tdata> {
  control: Control<Tdata>
  name: Path<Tdata>
  label?: string
  description?: string
  showMessageError?: boolean
  onChange: (value: boolean) => void
}

export function InputToggle<Tdata>({
  control,
  name,
  label,
  description,
  showMessageError,
  onChange,
}: InputToggleProps<Tdata>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Button
                type="button"
                variant={field.value ? 'default' : 'outline'}
                onClick={() => onChange(!field.value)}
                className="w-full"
              >
                {field.value ? 'Sim' : 'Não'}
              </Button>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {showMessageError && <FormMessage />}
          </FormItem>
        )
      }}
    />
  )
}
