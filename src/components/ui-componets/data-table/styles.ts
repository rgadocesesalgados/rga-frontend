import tw from 'tailwind-styled-components'
import { TableCell } from '@/components/ui/table'

export const cellNoRecordsFound = tw(TableCell)`
h-24
text-center
font-bold
`

export const container = tw.div`
flex
flex-col
gap-5
border
rounded-2xl
p-5
bg-white
`
