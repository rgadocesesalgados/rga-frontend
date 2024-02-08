import tw from 'tailwind-styled-components'

export const Scontainer = tw.div`
flex flex-col gap-2
w-full
`

export const Slabel = tw.label`
text-sm
`
export const Sinput = tw.input`
w-full p-5
border rounded
data-[error=true]:border-red-500
`

export const SerrorMessage = tw.p`
text-red-500 text-sm
`
