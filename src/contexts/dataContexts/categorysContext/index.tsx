'use client'
import { createContext } from 'react'
import { CategorysContextData } from './types'

import { useCategorys } from './useCategorys'

export const CategoryContext = createContext({} as CategorysContextData)

export const ProviderCategorys = ({ children }: { children: React.ReactNode }) => {
  const { getAllCategorys, addCategory, removeCategory, editCategory, categorys } = useCategorys()
  return (
    <CategoryContext.Provider value={{ getAllCategorys, addCategory, removeCategory, editCategory, categorys }}>
      {children}
    </CategoryContext.Provider>
  )
}
