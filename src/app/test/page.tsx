'use client'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { api } from '@/services/api/apiClient'
import { ClientProps } from '../clientes/types'
import { CommandLoading } from 'cmdk'

const fetchDebounce = (func: () => void) => {
  const deb = debounce(func, 1000, { trailing: true })

  return deb()
}

const deb = debounce((func: () => void) => {
  func()
}, 1000)
export default function Test() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('ema')

  const { data: dataFetch, refetch } = useQuery<ClientProps[]>({
    queryKey: ['search-clients', value],
    queryFn: async () => {
      const response = await api.get(`/search-client/${value}`)
      return response.data
    },
  })

  useEffect(() => {
    fetchDebounce(refetch)
  }, [value])

  const data = dataFetch?.map((item) => ({ label: item.name, value: item.id })) || []
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
            {value ? data.find((item) => item.value === value)?.label : 'Select framework...'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search framework..."
              onValueChange={(val) => {
                setValue(val)
                console.log(val)
                deb(() => console.log('debounced'))
              }}
            />
            <CommandList>
              <CommandLoading />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                  >
                    {item.label}
                    <Check className={cn('ml-auto', value === item.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
