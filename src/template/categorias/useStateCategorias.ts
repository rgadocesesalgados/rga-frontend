import { useState } from 'react'

export const useStateCategorias = () => {
  const [isOpen, setIsOpen] = useState(false)

  return { isOpen, setIsOpen }
}
