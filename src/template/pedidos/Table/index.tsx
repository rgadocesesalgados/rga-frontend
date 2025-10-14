import { useMutation, useQuery } from '@tanstack/react-query'
import { getOrders, OrdersResponse, removeOrder } from '@/services/orders'
import { toBRL } from '@/app/utils/toBRL'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Ellipsis, Loader2, PenSquareIcon, PrinterIcon, Search, Trash2 } from 'lucide-react'
import { GetOrder } from '@/types/order'
import { Input } from '@/components/ui/input'
import { debounce } from 'lodash'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { useOrderStates } from './useOrderStatus'
import { AlertDialog, AlertDialogTitle } from '@radix-ui/react-alert-dialog'
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import Link from 'next/link'
import { queryClient } from '@/app/layout'
import { toast } from 'react-toastify'
import { Print } from './print'

const fetchDebounce = debounce((func: () => void) => func(), 500)

export const TablePedidos = ({ children }: { children: React.ReactNode }) => {
  const { page, take, query, setOrderStates, idRemove, openDelete, openPrint } = useOrderStates()
  const { data, isLoading } = useQuery({
    queryKey: ['orders', page, take, query],
    queryFn: async () => {
      return await getOrders(page, take, query)
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: removeOrder,
    onSuccess: (_, orderId) => {
      setOrderStates({ idRemove: '', openDelete: false })

      const orders = queryClient.getQueryData(['orders', page, take, query]) as OrdersResponse[]

      queryClient.setQueryData(
        ['orders', page, take, query],
        orders.filter(({ id }) => id !== orderId),
      )
    },
    onError() {
      toast.error('Erro ao apagar!')
    },
  })

  if (openPrint) return <Print />
  return (
    <>
      {children}

      <AlertDialog open={openDelete} onOpenChange={(open) => setOrderStates({ openDelete: open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apagar pedido</AlertDialogTitle>
            <AlertDialogDescription>Se você apagar esse pedido, ele vai sumir de todo histórico</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button variant="destructive" onClick={() => mutate(idRemove)} disabled={isPending}>
              Apagar mesmo assim {!isPending && <Trash2 className="ml-2 h-4 w-4" />}
              {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="rounded-md border bg-white p-5">
        <div className="flex justify-start gap-2">
          <Input
            className="w-fit"
            placeholder="Nome ou telefone"
            onChange={(e) => fetchDebounce(() => setOrderStates({ query: e.target.value, page: 0, take: 10 }))}
          />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        {!isLoading && (
          <div className="flex flex-col divide-y">
            {data?.map(({ id, name, paid, status, date, total }) => {
              return <Order key={id} date={date} id={id} name={name} paid={paid} status={status} total={total} />
            })}

            {data?.length === 0 && (
              <p className="mx-auto my-10 text-center font-bold text-black/40">Nenhum pedido encontrado</p>
            )}
          </div>
        )}

        {isLoading && <Loader2 className="animate-spin" />}

        <Pagination>
          <PaginationContent>
            {!!page && (
              <PaginationItem
                onClick={() =>
                  setOrderStates((prev) => {
                    if (prev.page === 0) return prev

                    return { page: prev.page - 1 }
                  })
                }
              >
                <Button size="icon" variant="ghost">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>
            )}

            {!!page && (
              <>
                <PaginationItem>
                  <PaginationLink>{page}</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink isActive>{page + 1}</PaginationLink>
                </PaginationItem>
              </>
            )}

            {data?.length === take && (
              <PaginationItem>
                <PaginationLink>{page + 2}</PaginationLink>
              </PaginationItem>
            )}
            {data?.length === take && (
              <PaginationItem
                onClick={() =>
                  setOrderStates((prev) => {
                    if (data.length < take) return prev

                    return { page: prev.page + 1 }
                  })
                }
              >
                <Button size="icon" variant="ghost">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

interface OrderProps {
  id: string
  name: string
  date: string
  total: number
  paid: number
  status: GetOrder['status']
}
const Order = ({ date, name, paid, total, status, id }: OrderProps) => {
  const { setOrderStates } = useOrderStates()

  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div>
        <div className="text-xs font-bold text-black/60">{new Date(date).toLocaleDateString()}</div>
        <div className="text-sm">{name}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm">{toBRL(total)}</div>
        {!!paid && <Badge>{toBRL(paid)}</Badge>}
      </div>
      <Badge variant={status.toLocaleLowerCase() as BadgeProps['variant']}>
        {status === 'EM_PRODUCAO' ? 'Em Produção' : status}
      </Badge>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOrderStates({ openPrint: true, orderId: id })}>
            Imprimir <PrinterIcon className="ml-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOrderStates({ openOrderModal: true, orderId: id })}>
            Editar <PenSquareIcon className="ml-2 h-4 w-4" />
          </DropdownMenuItem>
          <Link href={`?openDelete=true&idRemove=${id}`}>
            <DropdownMenuItem className=" hover:bg-red-100 hover:text-red-600 focus:bg-red-100 focus:text-red-600">
              Apagar <Trash2 className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
