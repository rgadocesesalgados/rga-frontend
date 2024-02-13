import tw from 'tailwind-styled-components'

export const Scontainer = tw.div`
data-[isopen=true]:flex hidden
fixed
top-0
left-0
w-full
h-screen
bg-black
bg-opacity-70
z-10
flex-col

`

export const SdivClose = tw.div`
w-full
h-10
`

export const Scontent = tw.div`
w-full
h-full
bg-white
rounded-xl
`

export const Sheader = tw.header`
flex justify-between items-center
p-5
`
export const Sbutton = tw.button`
p-5
border rounded
`
