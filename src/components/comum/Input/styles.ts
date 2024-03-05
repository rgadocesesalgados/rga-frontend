import tw from 'tailwind-styled-components'

export const Scontainer = tw.div`
flex flex-col gap-2
w-full
data-[type=checkbox]:flex-row
data-[type=checkbox]:items-center
data-[type=checkbox]:w-min
data-[type=checkbox]:rounded-md
data-[type=checkbox]:border
data-[type=checkbox]:p-5

`

export const Slabel = tw.label`
text-sm
data-[type=checkbox]:text-md
`
export const Sinput = tw.input`
w-full p-5
border rounded
data-[error=true]:border-red-500

data-[type=checkbox]:w-min
accent-black
`

export const SerrorMessage = tw.p`
text-red-500 text-sm
`
