import { Label } from '@/components/ui/label'
import tw from 'tailwind-styled-components'

export const container = tw.div`
my-10
flex
flex-col
gap-5
`

export const label = tw(Label)`
mb-3
font-bold
capitalize
`

export const containerCake = tw.div`
flex
flex-col
gap-3
rounded-xl
even:bg-slate-50
px-5
`
