import { toBRL } from '@/app/utils/toBRL'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
import { useContextOrders } from '@/contexts/dataContexts/ordersContext/useContextOrders'
import { useView } from '@/contexts/view'

export const View = () => {
  const { id, open, handleOpen, setId } = useView()
  const { orders } = useContextOrders()

  const order = orders?.find((order) => order.id === id)

  if (!order) return null

  const { client, date, hour, delivery, address, bolo, orderProduct, payment } = order

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

  console.log(order)

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        handleOpen()
        setId('')
      }}
    >
      <DialogContent className="max-h-screen overflow-y-scroll rounded-2xl">
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
                              <img src={bolo.topper.banner} width={200} height={200} alt="Foto do modelo do topper" />
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

        <div className="rounded-2xl border border-green-500 bg-green-50 p-2 text-end text-green-800">
          Total: {toBRL(order.total)}
        </div>

        <div className="rounded-2xl border border-blue-500 bg-blue-50 p-2 text-end text-blue-800">
          Pagamentos: {payment.reduce((acc, pay) => acc + pay.value, 0)}
          {payment.length > 0 &&
            payment.map((p) => (
              <div key={p.id}>
                {p.type}: {p.value}
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
