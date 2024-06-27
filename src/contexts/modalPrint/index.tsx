'use client'
import { createContext, useContext, useState } from 'react'

interface ModalPrintProps {
  open: boolean
  handleOpen: () => void

  openTopper: boolean
  handleOpenTopper: () => void

  openDocesPP: boolean
  handleOpenDocesPP: () => void
}

const ModalPrint = createContext({} as ModalPrintProps)

export const ProviderModalPrint = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)

  const [openTopper, setOpenTopper] = useState(false)

  const [openDocesPP, setOpenDocesPP] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleOpenTopper = () => {
    setOpenTopper(!openTopper)
  }

  const handleOpenDocesPP = () => {
    setOpenDocesPP(!openDocesPP)
  }
  return (
    <ModalPrint.Provider value={{ open, handleOpen, openTopper, handleOpenTopper, openDocesPP, handleOpenDocesPP }}>
      {children}
    </ModalPrint.Provider>
  )
}

export const useModalPrint = () => {
  const context = useContext(ModalPrint)
  return context
}
