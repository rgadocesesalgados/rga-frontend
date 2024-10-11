import { addDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export const useDateRange = () => {
  const [dates, setDates] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return {
    dates,
    setDates,
  }
}
