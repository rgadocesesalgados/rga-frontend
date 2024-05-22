'use client'
import { createContext, useContext, useState } from 'react'

interface ModalPrintProps {
  open: boolean
  handleOpen: () => void
}

const ModalPrint = createContext({} as ModalPrintProps)

export const ProviderModalPrint = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return <ModalPrint.Provider value={{ open, handleOpen }}>{children}</ModalPrint.Provider>
}

export const useModalPrint = () => {
  const context = useContext(ModalPrint)
  return context
}
