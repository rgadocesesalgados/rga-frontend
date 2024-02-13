import tw from 'tailwind-styled-components'

export const DeleteItem = tw.button`
p-1
rounded-lg
bg-red-500
text-white
hover:bg-red-600
`

export const EditItem = tw(DeleteItem)`
bg-blue-500
hover:bg-blue-600
`
