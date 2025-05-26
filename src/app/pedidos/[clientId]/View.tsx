'use client'
import { toBRL } from '@/app/utils/toBRL'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/services/api/apiClient'
import { GetOrder } from '@/types/order'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

const TypePaymet = {
  PIX: 'Pix',
  DINHEIRO: 'Dinheiro',
  CARTAO_DE_CREDITO: 'Cartão de Credito',
  CARTAO_DE_DEBITO: 'Cartão de Debito',
}

export const View = ({ clientId }: { clientId: string }) => {
  const { data: orders, isLoading } = useQuery<GetOrder[]>({
    queryKey: ['order', clientId],
    queryFn: async () => {
      const response = await api.get(`/order/${clientId}`)

      return response.data
    },
  })

  if (isLoading) return <Loader2 className="animate-spin" />

  return (
    <div className="mx-auto max-w-4xl space-y-2">
      {orders.map(({ id, client, date, hour, delivery, address, bolo, orderProduct, payment, docesPP, ...order }) => {
        const productsPeerCategory = orderProduct.reduce(
          (acc, product) => {
            if (!acc[product.category.name]) {
              acc[product.category.name] = [product]
              acc.categorys.push(product.category.name)
              return acc
            } else {
              acc[product.category.name].push(product)
              return acc
            }
          },
          { categorys: [] as string[] },
        )

        const totalPayment = payment.reduce((acc, pay) => {
          if (pay.paid) return acc + pay.value

          return acc
        }, 0)

        const totalRestant = order.total - totalPayment
        return (
          <Dialog key={id}>
            <DialogTrigger asChild>
              <div className="flex gap-2 rounded-2xl border p-5">
                <div>{client.name}</div>
                <div>{new Date(date).toLocaleDateString()}</div>
              </div>
            </DialogTrigger>

            <DialogContent className="mt-5 max-h-screen overflow-y-scroll rounded-2xl pb-10">
              <DialogHeader>
                <DialogTitle>Pedido</DialogTitle>
              </DialogHeader>
              <div className="rounded-xl border">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableHead>Cliente: </TableHead> <TableCell>{client.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Tel: </TableHead> <TableCell>{client.tel}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Data: </TableHead> <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Hora: </TableHead> <TableCell>{hour}</TableCell>
                    </TableRow>
                    {delivery ? (
                      <TableRow>
                        <TableHead>Endereço: </TableHead>
                        <TableCell>{address.address_complete}</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableHead>Retirada:</TableHead>
                        <TableCell>Retirada no local</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {bolo.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableHead>Bolos</TableHead>
                  </TableHeader>
                  <TableBody>
                    {bolo.map((bolo, index) => (
                      <Table key={bolo.id}>
                        <TableHeader>
                          <TableHead>Bolo {index + 1}</TableHead>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Peso:</TableCell>
                            <TableCell>{bolo.peso}kg</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Formato:</TableCell>

                            <TableCell>{bolo.formato.toLowerCase()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Massa:</TableCell>
                            <TableCell>{bolo.massa.toLowerCase()}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Recheios:</TableCell>
                            <TableCell>{bolo.recheio.map((recheio) => recheio.name).join(', ')}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Valor:</TableCell>
                            <TableCell>{toBRL(bolo.price)}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Cobertura:</TableCell>
                            <TableCell>{bolo.cobertura.toLowerCase()}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Descrição:</TableCell>
                            <TableCell>{bolo.description ? bolo.description : 'Nenhuma'}</TableCell>
                          </TableRow>

                          {bolo.banner && (
                            <TableRow>
                              <TableCell>Modelo:</TableCell>
                              <TableCell>
                                <img src={bolo.banner} alt="Imagem do bolo" width={200} height={200} />
                              </TableCell>
                            </TableRow>
                          )}

                          <TableRow>
                            <TableCell>Tem topper:</TableCell>
                            <TableCell>{bolo.topper ? 'Sim' : 'Não'}</TableCell>
                          </TableRow>

                          {bolo.topper && (
                            <>
                              <TableRow>
                                <TableCell>Tema:</TableCell>
                                <TableCell>{bolo.topper.tema}</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell>Nome:</TableCell>
                                <TableCell>{bolo.topper.name ? bolo.topper.name : 'Nenhum'}</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell>Idade:</TableCell>
                                <TableCell>{bolo.topper.idade ? bolo.topper.idade : 'Nenhuma'}</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell>Descrição:</TableCell>
                                <TableCell>{bolo.topper.description ? bolo.topper.description : 'Nenhuma'}</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell>Modelo do Topper:</TableCell>
                                <TableCell>
                                  {bolo.topper.banner ? (
                                    <img
                                      src={bolo.topper.banner}
                                      width={200}
                                      height={200}
                                      alt="Foto do modelo do topper"
                                    />
                                  ) : (
                                    'Nenhum'
                                  )}
                                </TableCell>
                              </TableRow>
                            </>
                          )}
                        </TableBody>
                      </Table>
                    ))}
                  </TableBody>
                </Table>
              )}

              {docesPP.length > 0 && (
                <Table className="mt-5">
                  <TableCaption>Doces</TableCaption>
                  <TableHeader>
                    <TableHead>Produto</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Total</TableHead>
                  </TableHeader>
                  <TableBody>
                    {docesPP.map((product) => (
                      <TableRow key={product.id}>
                        <TableHead>{product.name}</TableHead>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{toBRL(product.price)}</TableCell>
                        <TableCell>{toBRL(product.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableHead colSpan={3}>Total</TableHead>
                      <TableCell>{toBRL(docesPP.reduce((acc, product) => acc + product.total, 0))}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              )}

              {orderProduct.length > 0 &&
                productsPeerCategory.categorys.map((category) => (
                  <Table key={category} className="mt-5">
                    <TableCaption>{category}</TableCaption>
                    <TableHeader>
                      <TableHead>Produto</TableHead>
                      <TableHead>Qtd</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Total</TableHead>
                    </TableHeader>
                    <TableBody>
                      {productsPeerCategory[category].map((product) => (
                        <TableRow key={product.id}>
                          <TableHead>{product.name}</TableHead>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{toBRL(product.price)}</TableCell>
                          <TableCell>{toBRL(product.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableHead colSpan={3}>Total</TableHead>
                        <TableCell>
                          {toBRL(productsPeerCategory[category].reduce((acc, product) => acc + product.total, 0))}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                ))}

              <Table>
                <TableHeader>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Pago</TableHead>
                  <TableHead>Data</TableHead>
                </TableHeader>
                <TableBody>
                  {payment.length > 0 &&
                    payment.map((pay) => (
                      <TableRow key={pay.id}>
                        <TableHead>{TypePaymet[pay.type]}</TableHead>
                        <TableCell>{toBRL(pay.value)}</TableCell>
                        <TableCell>{pay.paid ? 'Sim' : 'Não'}</TableCell>
                        <TableCell>{pay.date ? new Date(pay.date).toLocaleDateString() : ''}</TableCell>
                      </TableRow>
                    ))}

                  {payment.length === 0 && (
                    <TableRow>
                      <TableHead colSpan={4} className="text-center">
                        Nenhum pagamento encontrado
                      </TableHead>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <div className="rounded-2xl border border-green-500 bg-green-50 p-5 text-end text-green-800">
                Valor total: {toBRL(order.total)}
              </div>

              <div className="rounded-2xl border border-blue-500 bg-blue-50 p-5 text-end text-blue-800">
                Total pago: {toBRL(totalPayment)}
              </div>

              {totalRestant > 0 && (
                <div className="rounded-2xl border border-red-500 bg-red-50 p-5 text-end text-red-800">
                  Restante a pagar: {toBRL(totalRestant)}
                </div>
              )}
            </DialogContent>
          </Dialog>
        )
      })}
    </div>
  )
}
