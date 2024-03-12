'use client'
import { createContext } from 'react'
import { OrdersContextData } from './types'
import { useOrders } from './useOrders'

export const OrdersContext = createContext({} as OrdersContextData)

export const ProviderOrders = ({ children }: { children: React.ReactNode }) => {
  const { orders, addOrder, removeOrder, editOrder, getAllOrders } = useOrders()
  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        removeOrder,
        editOrder,
        getAllOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
