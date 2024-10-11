import { api } from '@/services/api/apiClient'
import { ErrorApi } from '@/services/api/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'
import { toast } from 'react-toastify'

interface Dates {
  startDate: number
  endDate: number
}

interface FinanceiroResponse {
  end_date: number
  start_date: number
  value: number
}

export interface OutsProps {
  outs: OutProps[]
  total: number
}

export interface OutProps {
  id: string
  date: number
  value: number
  supplier: string
}

export const useQuerys = (dates: DateRange) => {
  const query = useQuery<FinanceiroResponse>({
    queryKey: ['financial'],
    queryFn: async () => await getFinacialReport({ endDate: dates?.to?.getTime(), startDate: dates?.from?.getTime() }),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: getFinacialReportForDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial'] })
    },
  })

  const queryOuts = useQuery<OutsProps>({
    queryKey: ['outs'],
    queryFn: async () =>
      (await api.get('/out', { params: { startDate: dates?.from?.getTime(), endDate: dates?.to?.getTime() } })).data,
  })

  const mutationOuts = useMutation({
    mutationFn: getOutsForDate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['outs'] }),
    onError: (erro) => {
      const error = erro as ErrorApi
      toast.error(error.response.data?.error)
      console.log(error.response?.data)
    },
  })

  return {
    entradas: query,
    getEntradas: mutation,
    saidas: queryOuts,
    getOuts: mutationOuts,
  }
}

const getFinacialReport = async ({ endDate, startDate }: Dates) => {
  const response = await api.get('/financial-report', { params: { startDate, endDate } })

  return response.data
}

const getFinacialReportForDate = async (data: { startDate: number; endDate: number }) => {
  const response = await api.get('/financial-report', { params: data })

  return response.data
}

const getOutsForDate = async (data: { startDate: number; endDate: number }) => {
  const response = await api.get('/out', { params: data })

  return response.data
}
