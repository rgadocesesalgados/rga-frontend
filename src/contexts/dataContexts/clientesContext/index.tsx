'use client'
import { createContext } from 'react'
import { ClientContextData } from './types'
import { useClient } from './useClient'

export const ClientContext = createContext({} as ClientContextData)

export const ProviderClient = ({ children }: { children: React.ReactNode }) => {
  const { getAllClients, addClient, removeClient, editClient, clients } = useClient()

  return (
    <ClientContext.Provider
      value={{
        clients,
        getAllClients,
        addClient,
        removeClient,
        editClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}
