import { XMarkIcon } from '@heroicons/react/20/solid'
import tw from 'tailwind-styled-components'

export const Saside = tw.aside`
-left-full
data-[isOpen=true]:left-0
top-0
w-2/3 
min-h-screen
absolute
p-5
bg-slate-200
transition-all
flex flex-col
gap-5
items-start
`

export const SiconClose = tw(XMarkIcon)`
w-4 h-4
`
