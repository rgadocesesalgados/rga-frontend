import tw from 'tailwind-styled-components'

export const SconatainerOption = tw.div`
hidden
absolute
bg-white
max-h-72
flex-col
divide-y
overflow-y-scroll
border
data-[open=true]:flex
z-50
`

export const Soption = tw.button`
p-5
hover:bg-slate-300
focus:bg-slate-300
`
