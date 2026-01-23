import { addDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export const useDateRange = () => {
  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)

  const endDate = new Date()
  endDate.setHours(23, 59, 59, 99)

  const [dates, setDates] = useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  })

  return {
    dates,
    setDates,
  }
}
