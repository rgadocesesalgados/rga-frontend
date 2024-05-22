import tw from 'tailwind-styled-components'

export const container = tw.div`
fixed
top-0
min-h-screen
w-screen
justify-center
bg-white
data-[open=true]:flex
hidden
`

export const content = tw.div`
flex
flex-col
gap-2
rounded-2xl
border
p-5
`
export const nameAndDate = tw.div`
flex
justify-around
gap-5
`

export const name = tw.div`
text-xl
font-bold
`

export const date = tw.div`
font-bold
`

export const containerCakes = tw.div`
flex
flex-col
gap-3
`

export const cake = tw.div`

`
