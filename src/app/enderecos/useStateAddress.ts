import { useState } from 'react'

export const useStateAddress = () => {
  const [isOpen, setIsOpen] = useState(false)

  return { isOpen, setIsOpen }
}
