import Link from 'next/link'
import tw from 'tailwind-styled-components'

export const Slink = tw(Link)`
border rounded border-black
p-5
hover:bg-black
hover:text-white
active:bg-zinc-800
data-[pathname=true]:bg-black
data-[pathname=true]:text-white
`
