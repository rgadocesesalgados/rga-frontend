import { createContext } from 'react'
import { AddressContextData } from './types'
import { useAddress } from './useAddress'

export const AddressContext = createContext({} as AddressContextData)

export const ProviderAddress = ({ children }: { children: React.ReactNode }) => {
  const { getAllAddresses, addAddress, removeAddress, editAddress, address } = useAddress()
  return (
    <AddressContext.Provider
      value={{
        address,
        getAllAddresses,
        addAddress,
        removeAddress,
        editAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  )
}
