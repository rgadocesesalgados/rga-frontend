import tw from 'tailwind-styled-components'

export const Incoming = tw.div`
  text-3xl
  font-bold
  flex-1
  p-5
  text-green-600
`
export const Outs = tw(Incoming)`
  text-red-600

`
