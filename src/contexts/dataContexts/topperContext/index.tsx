'use client'

import { createContext } from 'react'
import { TopperContextData } from './types'
import { useTopper } from './useTopper'

export const TopperContext = createContext({} as TopperContextData)

export const ProviderTopper = ({ children }: { children: React.ReactNode }) => {
  const { topper, getAllTopper } = useTopper()

  return (
    <TopperContext.Provider
      value={{
        topper,
        getAllTopper,
      }}
    >
      {children}
    </TopperContext.Provider>
  )
}
