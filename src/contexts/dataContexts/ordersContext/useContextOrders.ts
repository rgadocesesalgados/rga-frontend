import { useContext } from 'react'
import { OrdersContext } from '.'

export const useContextOrders = () => useContext(OrdersContext)
