'use client'

import { createContext } from 'react'
import { RecheiosContextData } from './types'
import { useRecheios } from './useRecheios'

export const RecheiosContext = createContext({} as RecheiosContextData)

export const ProviderRecheios = ({ children }: { children: React.ReactNode }) => {
  const { recheios, getAllRecheios, addRecheio, removeRecheio, editRecheio } = useRecheios()

  return (
    <RecheiosContext.Provider
      value={{
        recheios,
        getAllRecheios,
        addRecheio,
        removeRecheio,
        editRecheio,
      }}
    >
      {children}
    </RecheiosContext.Provider>
  )
}
