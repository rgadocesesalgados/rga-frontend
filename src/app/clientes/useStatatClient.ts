import { useState } from 'react'

export const useStateClient = () => {
  const [isOpen, setIsOpen] = useState(false)

  return { isOpen, setIsOpen }
}
