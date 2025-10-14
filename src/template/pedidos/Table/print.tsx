'use client'
import * as S from '../../../template/pedidos/modal-print/styles'

import { toBRL } from '@/app/utils/toBRL'
import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import { Courier_Prime } from 'next/font/google'

import html2canvas from 'html2canvas'
import { Camera, Loader2 } from 'lucide-react'
import { getOrder } from '@/services/orders'
import { useQuery } from '@tanstack/react-query'
import { Box, OrderUniqueResponse } from '@/services/orders/type'
import { useOrderStates } from './useOrderStatus'

const courierPrime = Courier_Prime({ weight: ['400', '700'], subsets: ['latin'] })

export const Print = () => {
  const { setOrderStates, orderId } = useOrderStates()
  const { isLoading, data } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: async () => {
      return await getOrder(orderId)
    },
    enabled: !!orderId,
  })

  const boxes =
    data?.boxes.reduce((acc, box) => {
      return [...acc, ...box]
    }, [] as Box[]) ?? []

  const [showButtonPrint, setShowButtonPrint] = useState(true)

  const modalPrintScreen = useRef<HTMLDivElement>()

  const handlePrintScreen = async () => {
    const modalPrint = modalPrintScreen.current

    const canvas = await html2canvas(modalPrint, { height: modalPrint.scrollHeight + 15 })

    const dataURL = canvas.toDataURL('image/png')

    return dataURL
  }

  const [dataURL, setDataURL] = useState('')

  return (
    <S.container
      className={`${courierPrime.className} absolute left-0 right-0 top-0 flex w-full flex-col items-center`}
    >
      {showButtonPrint && (
        <div className="flex gap-2 self-end p-5">
          <Button
            type="button"
            variant="outline"
            className="text-red-500"
            onClick={() => setOrderStates({ openPrint: false, orderId: '' })}
          >
            voltar
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setShowButtonPrint(false)
              setDataURL('')
              setTimeout(() => {
                window.print()
                setShowButtonPrint(true)
              }, 10)
            }}
            className="font-bold"
          >
            Imprimir
          </Button>

          <Button
            type="button"
            onClick={async () => {
              setShowButtonPrint(false)
              setDataURL('')

              setTimeout(async () => {
                const urlImage = await handlePrintScreen()
                setDataURL(urlImage)
              }, 1)

              setShowButtonPrint(true)
            }}
          >
            Tirar print <Camera className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
      {isLoading && <Loader2 className="animate-spin" />}
      {!isLoading && (
        <div className="flex w-full max-w-xs flex-col gap-14 p-5" ref={modalPrintScreen}>
          <div>
            {dataURL && <img src={dataURL} alt="" className="rounded-2xl border shadow-2xl" />}

            <div className="flex gap-5 font-bold">
              <div>{data?.client.name}</div>
              <div>{new Date(data?.date).toLocaleDateString()}</div>
            </div>
            <div>{data?.client.tel}</div>
          </div>

          <S.containerCakes>
            {data?.cakes.map((cake) => {
              return (
                <div key={cake.id} className="flex flex-col gap-1 py-5">
                  <div className="flex gap-2">
                    <div className="text-nowrap">{cake.peso == 0.6 ? 'Bento cake' : `${cake.peso}kg`}</div>
                    {cake.recheios.map((recheio) => recheio.name).join(', ')}
                  </div>

                  <div>Massa {cake.massa.toLocaleLowerCase()}</div>

                  <div className="flex items-baseline capitalize">
                    <div>{cake.formato.toLocaleLowerCase()}</div> <Divider />
                    <div className="font-bold">{toBRL(cake.price)}</div>
                  </div>

                  <div>Cobertura: {cake.cobertura}</div>

                  {cake.cobertura === 'CHANTILLY' && !cake.decoracao && !cake.banner && <div>Descoração Normal</div>}

                  {cake.decoracao && (
                    <div>
                      <p className="text-wrap">Descrição: {cake.decoracao}</p>
                    </div>
                  )}

                  <div>{cake.banner ? 'Tem Modelo' : 'Não tem modelo'}</div>

                  {cake.tem_topper && (
                    <div className="flex flex-col gap-1 pt-5">
                      <div className="flex items-baseline font-bold">
                        <div className="text-nowrap">Tem topper</div>
                        <Divider />
                        <div>{toBRL(cake.topper.price)}</div>
                      </div>

                      <div>{cake.topper.tema}</div>
                      <div>
                        {cake.topper.name ? cake.topper.name : 'Sem nome'} -{' '}
                        {cake.topper.idade ? cake.topper.idade : 'Sem idade'}
                      </div>

                      {cake.topper.description && (
                        <div>
                          <p>{cake.topper.description}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </S.containerCakes>
          <div>
            {boxes.length > 0 && (
              <div className="space-y-5 py-2">
                {boxes?.map((box) => {
                  return (
                    <div key={box.id} className="border-2 border-dashed p-1">
                      {box.products.map((product) => (
                        <div key={product.id} className="flex flex-nowrap gap-2">
                          <div>{product.quantity}</div> <div>{product.name}</div>
                        </div>
                      ))}
                      <div className="flex flex-nowrap items-baseline font-bold">
                        <div className="flex flex-nowrap gap-2">
                          <div>{box.size}</div>
                          <div className="text-nowrap">doces</div>
                        </div>
                        <Divider />
                        <div>{toBRL(box.products.reduce((acc, { total }) => acc + total, 0))}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            {data.orderProduct?.map((orderProduct, index) => {
              if (orderProduct.length === 0) return
              return (
                <div key={index}>
                  {orderProduct.map((product) => {
                    return (
                      <div key={product.id} className="flex gap-2">
                        <div>{product.quantity}</div> <div>{product.product.name}</div>
                      </div>
                    )
                  })}

                  <div className="flex flex-nowrap items-baseline font-bold">
                    <div className="flex flex-nowrap gap-2">
                      <div>{quantityProduct(orderProduct)}</div>
                      <div className="text-nowrap">unidades</div>
                    </div>
                    <Divider />
                    <div>{toBRL(priceProduct(orderProduct))}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {data?.delivery && (
            <div className="flex items-baseline font-bold">
              <div>Entrega</div>
              <Divider />
              <div>{toBRL(data.value_frete)}</div>
            </div>
          )}

          <div className="flex items-baseline font-bold">
            <div>Total</div>
            <Divider />
            <div>{toBRL(data?.total)}</div>
          </div>

          {data?.cor_forminhas && (
            <div>
              <div>Forminhas: </div>
              <div>{data?.cor_forminhas}</div>
            </div>
          )}

          {data?.observations && <div>Observação: {data?.observations}</div>}

          {data?.payment && (
            <div>
              {data?.payment.map((payment) => {
                return (
                  <div key={payment.id} className="py-5">
                    {payment.paid && (
                      <div className="flex flex-col">
                        <div>{payment.paid && new Date(payment.date).toLocaleDateString()}</div>
                        <div>
                          Pago {payment.formPayment} - {toBRL(payment.value)}
                        </div>
                      </div>
                    )}

                    {!payment.paid && <div>Receber em: {payment.formPayment}</div>}
                  </div>
                )
              })}
            </div>
          )}

          <div className="mt-5">{data?.delivery ? data.address : 'Retirada no local'}</div>
          <div className="font-bold">{data?.hour}</div>
        </div>
      )}
    </S.container>
  )
}

const quantityProduct = (orderProduct: OrderUniqueResponse['orderProduct'][0]) => {
  return orderProduct.reduce((acc, product) => {
    return acc + product.quantity
  }, 0)
}

const priceProduct = (orderProduct: OrderUniqueResponse['orderProduct'][0]) => {
  return orderProduct.reduce((acc, product) => {
    return acc + product.total
  }, 0)
}

const Divider = () => {
  return <div className="mx-2 w-full border-b border-dashed border-black" />
}
