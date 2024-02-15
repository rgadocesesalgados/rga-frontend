import { useState } from 'react'
import { FormData } from './types'

export const states = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState<FormData[]>([])

  return { isOpen, setIsOpen, edit, setEdit, data, setData }
}
