'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from './dashboard/layout'
import { api } from '@/services/api/apiClient'
import { DatePicker } from '@/components/ui/date-picker'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Bike, Loader2, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { toBRL } from './utils/toBRL'
import { queryClient } from './layout'
import { useState } from 'react'

export interface DeliveryProps {
  id: string
  date: Date
  hour: string
  client_name: string
  address_complete: string
  type_delivery: 'FRETE_CARRO' | 'FRETE_MOTO'
  payment: number
  value_frete: number
}

const getDelivery = async (date = new Date()) => {
  const startDate = date.setHours(0, 0, 0, 0)
  const response = await api.get(`/delivery?date=${startDate}`)

  return response.data as DeliveryProps[]
}

const TypeDeliveryIcon = {
  FRETE_MOTO: (
    <div className="w-min rounded-xl bg-violet-700 p-2 text-white">
      <Bike className="h-4 w-4" />
    </div>
  ),
  FRETE_CARRO: (
    <div className="w-min rounded-xl bg-yellow-400 p-2">
      <Truck className="h-4 w-4" />
    </div>
  ),
}

export default function Home() {
  const { data, isLoading } = useQuery<DeliveryProps[]>({
    queryKey: ['delivery'],
    queryFn: async () => await getDelivery(),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: getDelivery,
    onSuccess: (data) => {
      console.log(data)
      queryClient.setQueryData(['delivery'], data)
    },
  })

  const [date, setDate] = useState<Date>()

  return (
    <Layout>
      <Wrap>
        <div className="flex justify-between gap-2 py-5">
          <h1 className="text-xl font-bold">Entregas</h1>
          <DatePicker
            value={date}
            onChange={(date) => {
              setDate(date)
              mutate(date)
            }}
          />
        </div>

        <div className="rounded-2xl border bg-white p-5">
          {((!data && isLoading) || isPending) && <Loader2 className="animate-spin" />}
          {!((!data && isLoading) || isPending) && (
            <>
              <div className="font-bold">{data.length} Entregas</div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horário</TableHead>
                    <TableHead>Frete</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Pago</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.map(({ hour, id, type_delivery, address_complete, payment, client_name, value_frete }) => (
                    <TableRow key={id}>
                      <TableCell className="w-min">{hour}</TableCell>
                      <TableCell>
                        <div className="flex w-min flex-col items-center gap-1">
                          {TypeDeliveryIcon[type_delivery]} <Badge variant="em_producao">{toBRL(value_frete)}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <div>{address_complete}</div>
                          <div>{client_name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="w-min">{payment && <Badge>{toBRL(payment)}</Badge>}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      </Wrap>
    </Layout>
  )
}
