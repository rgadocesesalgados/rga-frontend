'use client'
import { useState } from 'react'

export const useStateProdutos = () => {
  const [isOpen, setIsOpen] = useState(false)

  return { isOpen, setIsOpen }
}
