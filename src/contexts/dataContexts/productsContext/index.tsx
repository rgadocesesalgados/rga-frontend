'use client'
import { createContext } from 'react'
import { useProduct } from './useProduct'
import { ProductContextData } from './types'

export const ProductContext = createContext({} as ProductContextData)

export const ProviderProduct = ({ children }: { children: React.ReactNode }) => {
  const { products, getAllProducts, addProduct, removeProduct, editProduct } = useProduct()

  return (
    <ProductContext.Provider
      value={{
        products,
        getAllProducts,
        addProduct,
        removeProduct,
        editProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
