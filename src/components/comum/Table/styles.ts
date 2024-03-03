import tw from 'tailwind-styled-components'

export const container = tw.div`
flex
flex-col
gap-5
rounded
border
p-5
overflow-hidden
overflow-x-auto
`

export const table = tw.table`
w-full

`

export const caption = tw.caption`
mb-5
text-start
text-sm
`

export const td = tw.td`
py-5
px-3
text-nowrap
text-sm
overflow-hidden
text-ellipsis
`

export const tdAction = tw(td)`
flex
gap-2
`
export const tbory = tw.tbody`
divide-y`
