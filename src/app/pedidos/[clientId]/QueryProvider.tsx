'use client'

import { api } from '@/services/api/apiClient'
import { GetOrder } from '@/types/order'
import { useQuery } from '@tanstack/react-query'
import { Loader2, MoreHorizontal, Printer } from 'lucide-react'
import { Print } from './Print'
import { toBRL } from '@/app/utils/toBRL'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { parseAsBoolean, parseAsString, useQueryState } from 'nuqs'
import { Badge } from '@/components/ui/badge'

export const QueryProvider = ({ clientId }: { clientId: string }) => {
  const { data: orders, isLoading } = useQuery<GetOrder[]>({
    queryKey: ['order', clientId],
    queryFn: async () => {
      const response = await api.get(`/order/${clientId}`)

      return response.data
    },
  })

  const [, setOpen] = useQueryState('open', parseAsBoolean.withDefault(false))
  const [orderId, setOrderId] = useQueryState('orderId', parseAsString.withDefault(''))

  if (isLoading) return <Loader2 className="animate-spin" />

  return (
    <div className="flex justify-center">
      <div className="mx-5 w-full max-w-4xl space-y-2 divide-y rounded-xl border bg-white">
        {orders.map(({ id, client, date, hour, payment, ...order }) => {
          const totalPayment = payment.reduce((acc, pay) => {
            if (pay.paid) return acc + pay.value

            return acc
          }, 0)

          return (
            <div className="flex items-center gap-2 p-5" key={id}>
              <div>{new Date(date).toLocaleDateString()}</div>
              <div>{hour}</div>
              <div>{client.name}</div>
              <div>
                <div>{toBRL(order.total)}</div>
                {totalPayment > 0 && <Badge>{toBRL(totalPayment)}</Badge>}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild className="ml-auto">
                  <Button variant="outline" size="icon">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpen(true)
                      setOrderId(id)
                    }}
                  >
                    <Printer /> Imprimir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        })}

        <Print order={orders.find(({ id }) => id === orderId)} />
      </div>
    </div>
  )
}
