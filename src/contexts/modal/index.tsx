'use client'
import { createContext, useContext, useState } from 'react'

interface ModalProps {
  open: boolean
  openCategory: boolean
  openProduct: boolean
  openAddress: boolean
  openClient: boolean
  openOrder: boolean
  handleOpen: () => void
  handleOpenCategory: () => void
  handleOpenProduct: () => void
  handleOpenAddress: () => void
  handleOpenClient: () => void
  handleOpenOrder: () => void
}

const Modal = createContext({} as ModalProps)

export const ProviderModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState(false)
  const [openProduct, setOpenProduct] = useState(false)
  const [openAddress, setOpenAddress] = useState(false)
  const [openClient, setOpenClient] = useState(false)
  const [openOrder, setOpenOrder] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleOpenCategory = () => {
    setOpenCategory(!openCategory)
  }

  const handleOpenProduct = () => {
    setOpenProduct(!openProduct)
  }

  const handleOpenAddress = () => {
    setOpenAddress(!openAddress)
  }

  const handleOpenClient = () => {
    setOpenClient(!openClient)
  }

  const handleOpenOrder = () => {
    setOpenOrder(!openOrder)
  }

  return (
    <Modal.Provider
      value={{
        open,
        openCategory,
        openProduct,
        openAddress,
        openClient,
        openOrder,
        handleOpen,
        handleOpenCategory,
        handleOpenProduct,
        handleOpenAddress,
        handleOpenClient,
        handleOpenOrder,
      }}
    >
      {children}
    </Modal.Provider>
  )
}

export const useModal = () => useContext(Modal)
