import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Control, Path } from 'react-hook-form'

interface SelectSearchProps<Tdata> {
  control: Control<Tdata>
  name: Path<Tdata>
  data: Option[]
  onSelect: (value: string) => void
  label?: string
  description?: string
  showMessageError?: boolean
  className?: string
  commandEmpty?: React.ReactNode
  shouldFilter?: boolean
  onValueChange?: (value: string) => void
  isLoading?: boolean
}

interface Option {
  label: string
  value: string
  complement?: string
}

export function SelectSearch<Tdata>({
  control,
  name,
  data,
  label,
  description,
  className,
  showMessageError = false,
  commandEmpty,
  onSelect,
  shouldFilter,
  onValueChange,
  isLoading,
}: SelectSearchProps<Tdata>) {
  const [open, setOpen] = useState(false)
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="block">
                <Button
                  variant="outline"
                  type="button"
                  className={`h-min w-full text-wrap ${className}`}
                  role="combobox"
                  aria-expanded={open}
                  onClick={() => setOpen(true)}
                >
                  {field.value ? data?.find((item) => item.value === field.value)?.label : 'Procurar'}
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start">
                <Command shouldFilter={shouldFilter}>
                  <CommandInput placeholder="Procuar" onValueChange={onValueChange} />
                  {!isLoading && <CommandEmpty>{commandEmpty ? commandEmpty : 'Não encontrado'}</CommandEmpty>}
                  {isLoading && (
                    <div className="mx-auto py-2">
                      <Loader2 className="animate-spin" />
                    </div>
                  )}
                  <CommandList>
                    {data?.map((item) => (
                      <CommandItem
                        key={item.value}
                        onSelect={() => {
                          setOpen(false)
                          onSelect(item.value)
                        }}
                      >
                        <Check className={`mr-2 h-4 w-4 ${item.value === field.value ? 'opacity-100' : 'opacity-0'}`} />

                        <div className="flex flex-col gap-2">
                          <div>{item.label}</div>
                          <div>{item?.complement}</div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}.</FormDescription>}
            {showMessageError && <FormMessage />}
          </FormItem>
        )
      }}
    />
  )
}
