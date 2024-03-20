import { useState } from 'react'

export const useStatePedidos = () => {
  const [isOpen, setIsOpen] = useState(false)

  return {
    isOpen,
    setIsOpen,
  }
}
