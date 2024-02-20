import { useState } from 'react'
import { CategoryProps } from './page'

export const useStateCategorias = () => {
  const [data, setData] = useState<CategoryProps[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [edit, setEdit] = useState(false)

  return { data, setData, isOpen, setIsOpen, edit, setEdit }
}
