'use client'
import { Bolos } from '@/template/relatorios/bolos'
import Layout from '../dashboard/layout'
import { Wrap } from '@/components/comum/Wrap'
import { Toppers } from '@/template/relatorios/topper'
import { GetRelatoriosProps } from '@/contexts/relatorios'
import { Produtos } from '@/template/relatorios/produtos/Produtos'
import { PrintBolos } from '@/template/relatorios/Print'
import { useModalPrint } from '@/contexts/modalPrint'
import { GetOrder } from '@/types/order'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { PrintToppers } from '@/template/relatorios/topper/PrintToppers'
import { Check, Loader2 } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/services/api/apiClient'
import { useDateRange } from '../financeiro/hooks/useDateRange'
import { DatePickerWithRange } from '@/components/ui-componets/date-picker-range'
import { parseAsArrayOf, parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs'
import { GetRelatorio } from '@/types/relatorios/get'
import { AxiosError } from 'axios'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { queryClient } from '../layout'

const statusList: GetOrder['status'][] = ['RASCUNHO', 'ANOTADO', 'EM_PRODUCAO', 'CANCELADO', 'ENTREGUE']
const getRelatorios = async ({ dateInicial, dateFinal, status }: GetRelatoriosProps) => {
  const response = await api.post('/relatorios', { dateInicial, dateFinal, status })

  return response.data as GetRelatorio
}
export default function Relatorios() {
  const { dates, setDates } = useDateRange()

  const [date, setDate] = useQueryStates({
    startDate: parseAsInteger.withDefault(dates?.from.setHours(0, 0, 0, 0) || new Date().setHours(0, 0, 0, 0)),
    endDate: parseAsInteger.withDefault(dates?.to?.setHours(23, 59, 59)),
    status: parseAsArrayOf(parseAsStringEnum(statusList)).withDefault(['ANOTADO']),
  })
  const { data, isFetching: isPendingGet } = useQuery<GetRelatorio>({
    queryKey: ['relatorios', date.startDate, date.endDate, date.status],
    queryFn: async () =>
      await getRelatorios({
        dateInicial: new Date(date.startDate),
        dateFinal: new Date(date.endDate),
        status: date.status,
      }),
    initialData: { bolos: [], produtos: {}, toppers: [], boxes: [], orders: [] },
    throwOnError(error) {
      if (error instanceof AxiosError) {
        console.log(error.response.data)
      }

      console.log(error)
      return false
    },
  })
  const { open, openTopper, handleOpen } = useModalPrint()
  console.log(data)

  const { mutate, isPending } = useMutation({
    mutationFn: async (ids: string[]) => {
      await api.patch('/relatorios', { ids })
    },
    onSuccess() {
      toast.success('Produtos colocados em produção')
      queryClient.setQueryData(['relatorios', date.startDate, date.endDate, date.status], {
        bolos: [],
        produtos: {},
        toppers: [],
        boxes: [],
        orders: [],
      })
    },
    onError(err) {
      if (err instanceof AxiosError) {
        toast.error(err.response.data.error)
        console.log(err.response.data)
        return
      }

      console.log(err)
      toast.error('Error no servidor')
    },
  })

  return (
    <Layout>
      <Wrap data-open={open || openTopper} className="space-y-10 data-[open=true]:hidden">
        <DatePickerWithRange
          date={dates}
          setDate={(value) => {
            setDates(value)
            console.clear()

            console.log(value?.from?.toLocaleString(), value?.to?.toLocaleString())
            const startDate = value?.from?.getTime()
            const endDate = value?.to?.getTime() ?? value?.from?.getTime()

            setDate({ startDate, endDate })
          }}
          onChange={() => {}}
        />

        <div className="flex w-fit flex-wrap gap-2 rounded-2xl">
          {statusList
            .filter((stt) => date.status.includes(stt))
            .map((item) => {
              return (
                <Badge
                  className="py-3"
                  key={item}
                  variant={item.toLocaleLowerCase() as BadgeProps['variant']}
                  onClick={() => {
                    setDate((prev) => ({ status: prev.status.filter((status) => status !== item) }))
                  }}
                >
                  {item} <Check className="ml-2 h-4 w-4" />
                </Badge>
              )
            })}

          {statusList
            .filter((stt) => !date.status.includes(stt))
            .map((item) => {
              return (
                <Badge
                  key={item}
                  variant="outline"
                  className="bg-white py-3"
                  onClick={() => {
                    setDate((prev) => ({ status: [...prev.status, item] }))
                  }}
                >
                  {item}
                </Badge>
              )
            })}
        </div>
        <div className="flex justify-between">
          <Button
            size="sm"
            variant="link"
            disabled={!data.orders.length || isPending}
            onClick={async () => mutate(data.orders)}
          >
            Produzir {isPending && <Loader2 className="ml-2 animate-spin" />}
          </Button>

          <Button
            onClick={() => {
              handleOpen()
            }}
          >
            Imprimir tudo
          </Button>
        </div>

        {isPendingGet && <Loader2 className="animate-spin" />}
        {!isPendingGet && (
          <>
            <Bolos data={data.bolos} />

            <Toppers data={data.toppers} />

            <Produtos data={data.produtos} />
          </>
        )}
      </Wrap>

      {open && <PrintBolos cakes={data.bolos} boxes={data.boxes} />}

      {openTopper && <PrintToppers data={data.toppers} />}
    </Layout>
  )
}
