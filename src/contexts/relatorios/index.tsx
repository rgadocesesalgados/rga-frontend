'use client'

import { api } from '@/services/api/apiClient'
import { GetOrder } from '@/types/order'
import { GetRelatorio } from '@/types/relatorios/get'
import { createContext, useContext, useState } from 'react'

export interface GetRelatoriosProps {
  dateInicial: Date | null
  dateFinal: Date | null
  status: GetOrder['status'][]
}
interface RelatoriosContextData {
  relatorios: GetRelatorio
  getRelatorios: (data: GetRelatoriosProps) => Promise<void>
}
const RelatoriosContext = createContext({} as RelatoriosContextData)

export const ProviderRelatorios = ({ children }: { children: React.ReactNode }) => {
  const [relatorios, setRelatorios] = useState<GetRelatorio>()

  const getRelatorios = async ({ dateInicial, dateFinal, status }: GetRelatoriosProps) => {
    await api
      .post('/relatorios', { dateInicial, dateFinal, status })
      .then((response) => {
        setRelatorios(response.data)
        console.log({ relatorios: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return <RelatoriosContext.Provider value={{ relatorios, getRelatorios }}>{children}</RelatoriosContext.Provider>
}

export const useRelatorios = () => useContext(RelatoriosContext)
