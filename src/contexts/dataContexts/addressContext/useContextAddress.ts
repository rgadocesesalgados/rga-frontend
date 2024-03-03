import { useContext } from 'react'
import { AddressContext } from '.'

export const useAddress = () => useContext(AddressContext)
