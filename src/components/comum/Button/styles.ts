import tw from 'tailwind-styled-components'

export const Sbutton = tw.button`
p-5
border rounded
bg-black
text-white

data-[color=outline]:bg-transparent
data-[color=outline]:text-black

data-[color=green]:border-green-600
data-[color=green]:bg-green-100
data-[color=green]:text-green-600

data-[color=blue]:border-blue-600
data-[color=blue]:bg-blue-100
data-[color=blue]:text-blue-600

data-[color=red]:border-red-600
data-[color=red]:bg-red-100
data-[color=red]:text-red-600
`
