import { Label } from '@/components/ui/label'
import tw from 'tailwind-styled-components'

export const container = tw.div`
my-10
flex
flex-col
gap-3
`

export const labelHead = tw(Label)`
mb-3
font-bold
capitalize
`

export const containerProduct = tw.div`
grid
grid-cols-2
gap-3
rounded-xl
p-5
even:bg-slate-50
md:grid-cols-5
sm:grid-cols-3
items-end
`
