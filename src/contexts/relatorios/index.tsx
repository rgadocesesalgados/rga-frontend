'use client'

import { api } from '@/services/api/apiClient'
import { GetRelatorio } from '@/types/relatorios/get'
import { createContext, useContext, useState } from 'react'

interface RelatoriosContextData {
  relatorios: GetRelatorio
  getRelatorios: (dateInicial?: Date, dateFinal?: Date) => Promise<void>
}
const RelatoriosContext = createContext({} as RelatoriosContextData)

export const ProviderRelatorios = ({ children }: { children: React.ReactNode }) => {
  const [relatorios, setRelatorios] = useState<GetRelatorio>()

  const getRelatorios = async (dateInicial?: Date, dateFinal?: Date) => {
    await api
      .post('/relatorios', { dateInicial, dateFinal })
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