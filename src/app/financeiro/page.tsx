'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Layout from '../dashboard/layout'

import { api } from '@/services/api/apiClient'

interface FinanceiroResponse {
  today_end: number
  today_start: number
  value: number
}
const getFinacialReport = async () => {
  const response = await api.get('/financial-report')

  return response.data
}

const getFinacialReportForDate = async (data: { startDate: number; endDate: number }) => {
  const response = await api.get('/financial-report', { params: data })

  return response.data
}
export default function Financeiro() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  const query = useQuery<FinanceiroResponse>({ queryKey: ['financial'], queryFn: getFinacialReport })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: getFinacialReportForDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial'] })
    },
  })
  return (
    <Layout>
      <Wrap>
        <DatePickerWithRange
          date={date}
          setDate={setDate}
          onChange={() => mutation.mutate({ startDate: date.from?.getTime(), endDate: date.to?.getTime() })}
        />
        <div className="mt-5 text-3xl font-bold">
          {query.data && Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(query.data.value)}
        </div>
      </Wrap>
    </Layout>
  )
}

import { addDays } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import { Wrap } from '@/components/comum/Wrap'

function DatePickerWithRange({
  className,
  date,
  onChange,
  setDate,
}: React.HTMLAttributes<HTMLDivElement> & {
  className?: string
  date: DateRange | undefined
  setDate: (data: DateRange) => void
  onChange: () => void
}) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {date.from.toLocaleDateString()} - {date.to.toLocaleDateString()}
                </>
              ) : (
                date.from.toLocaleDateString()
              )
            ) : (
              <span>Selecione</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(value) => {
              setDate(value)
              onChange()
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
