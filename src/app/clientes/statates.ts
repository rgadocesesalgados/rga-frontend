import { useState } from 'react'
import { FormData } from '../enderecos/types'
import { FormDataCliente } from './types'

export const states = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [dataAddress, setDataAddress] = useState<FormData[]>([])
  const [data, setData] = useState<FormDataCliente[]>([])
  const [openOption, setOpenOption] = useState(false)
  return { isOpen, setIsOpen, edit, setEdit, dataAddress, setDataAddress, data, setData, openOption, setOpenOption }
}
