'use client'
import { createContext, useContext, useState } from 'react'

interface ViewContextData {
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
  open: boolean
  handleOpen: () => void
}

const ViewContext = createContext({} as ViewContextData)

export const ProviderView = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState('')
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return <ViewContext.Provider value={{ id, setId, open, handleOpen }}>{children}</ViewContext.Provider>
}
export const useView = () => useContext(ViewContext)
