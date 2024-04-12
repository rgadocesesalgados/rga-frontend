import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { OptionProps } from '../comum/InputSelect/types'
import { Button } from './button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface InputSelectProps {
  data: OptionProps[]
  value: string
  setValue: (value: string) => void
}

export const InputSelect = ({ data, value, setValue }: InputSelectProps) => {
  console.log(data)
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" role="combobox" className="w-[200px] " type="button">
          {!value ? 'Buscar...' : data.find((item) => item.value === value)?.label}

          <ChevronUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>Não encontrado...</CommandEmpty>
            <CommandGroup heading="Sugestõe" />
            {data?.map((item) => (
              <>
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={() => {
                    console.log(item.value)
                    setValue(item.value)
                  }}
                >
                  {item.label}
                </CommandItem>
              </>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
