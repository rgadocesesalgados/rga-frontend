import { useContext } from 'react'
import { OrdersContext } from '.'

export const useContextPedidos = () => useContext(OrdersContext)
