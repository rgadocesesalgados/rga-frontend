'use client'
import * as S from '../../../template/pedidos/modal-print/styles'

import { toBRL } from '@/app/utils/toBRL'
import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import { GetOrderProduct } from '@/types/order-product'
import { Courier_Prime } from 'next/font/google'

import html2canvas from 'html2canvas'
import { Camera } from 'lucide-react'
import { GetOrder } from '@/types/order'
import { parseAsBoolean, useQueryState } from 'nuqs'

const courierPrime = Courier_Prime({ weight: ['400', '700'], subsets: ['latin'] })

export const Print = ({ order }: { order: GetOrder }) => {
  const [open, setOpen] = useQueryState('open', parseAsBoolean)

  const [showButtonPrint, setShowButtonPrint] = useState(true)

  const categories = order?.orderProduct.reduce((acc, product) => {
    if (acc.includes(product.category.name)) return acc

    return [...acc, product.category.name]
  }, [] as string[])

  const modalPrintScreen = useRef<HTMLDivElement>()

  const handlePrintScreen = async () => {
    const modalPrint = modalPrintScreen.current

    const canvas = await html2canvas(modalPrint, { height: modalPrint.scrollHeight + 15 })

    const dataURL = canvas.toDataURL('image/png')

    return dataURL
  }

  const [dataURL, setDataURL] = useState('')

  return (
    <S.container data-open={open} className={`${courierPrime.className} absolute left-0 right-0 top-0`}>
      <div className="flex w-full max-w-96 flex-col gap-14 p-5" ref={modalPrintScreen}>
        <div>
          {dataURL && <img src={dataURL} alt="" className="rounded-2xl border shadow-2xl" />}

          <div className="flex gap-5 font-bold">
            <div>{order?.client.name}</div>
            <div>{new Date(order?.date).toLocaleDateString()}</div>
          </div>
          <div>{order?.client.tel}</div>
        </div>

        <S.containerCakes>
          {order?.bolo.map((cake) => {
            return (
              <div key={cake.id} className="flex flex-col gap-1 py-5">
                <div className="flex gap-2">
                  <div className="text-nowrap">{cake.peso == 0.6 ? 'Bento cake' : `${cake.peso}kg`}</div>
                  {cake.recheio.map((recheio) => recheio.name).join(', ')}
                </div>

                <div>Massa {cake.massa.toLocaleLowerCase()}</div>

                <div className="flex items-baseline capitalize">
                  <div>{cake.formato.toLocaleLowerCase()}</div> <Divider />
                  <div className="font-bold">{toBRL(cake.price)}</div>
                </div>

                <div>Cobertura: {cake.cobertura}</div>

                {cake.cobertura === 'CHANTILLY' && !cake.description && !cake.banner && <div>Descoração Normal</div>}

                {cake.description && (
                  <div>
                    <p className="text-wrap">Descrição: {cake.description}</p>
                  </div>
                )}

                <div>{cake.banner ? 'Tem Modelo' : 'Não tem modelo'}</div>

                {cake.topper && (
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
          {order?.boxes.length > 0 && (
            <div className="space-y-5 py-2">
              {order?.boxes.map((box) => {
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

        <div>
          {categories?.map((category) => {
            return (
              <div key={category} className="py-8">
                {filterCategory(order?.orderProduct, category).map((product) => {
                  return (
                    <div key={product.id} className="flex gap-2">
                      <div>{product.quantity}</div> <div>{product.name}</div>
                    </div>
                  )
                })}

                <div className="flex flex-nowrap items-baseline font-bold">
                  <div className="flex flex-nowrap gap-2">
                    <div>{quantityProduct(filterCategory(order?.orderProduct, category))}</div>
                    <div className="text-nowrap">{category}</div>
                  </div>
                  <Divider />
                  <div>{toBRL(priceProduct(filterCategory(order?.orderProduct, category)))}</div>
                </div>
              </div>
            )
          })}
        </div>

        {order?.delivery && (
          <div className="flex items-baseline font-bold">
            <div>Entrega</div>
            <Divider />
            <div>{toBRL(order.address.value_frete)}</div>
          </div>
        )}

        <div className="flex items-baseline font-bold">
          <div>Total</div>
          <Divider />
          <div>{toBRL(order?.total)}</div>
        </div>

        {order?.cor_forminhas && (
          <div>
            <div>Forminhas: </div>
            <div>{order?.cor_forminhas}</div>
          </div>
        )}

        {order?.observations && <div>Observação: {order?.observations}</div>}

        {order?.payment && (
          <div>
            {order?.payment.map((payment) => {
              return (
                <div key={payment.id} className="py-5">
                  {payment.paid && (
                    <div className="flex flex-col">
                      <div>{payment.paid && new Date(payment.date).toLocaleDateString()}</div>
                      <div>
                        Pago {payment.type} - {toBRL(payment.value)}
                      </div>
                    </div>
                  )}

                  {!payment.paid && <div>Receber em: {payment.type}</div>}
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-5">{order?.delivery ? order.address.address_complete : 'Retirada no local'}</div>
        <div className="font-bold">{order?.hour}</div>
      </div>
      {showButtonPrint && (
        <div className="fixed right-5 top-5 flex gap-2">
          <Button type="button" variant="outline" className="text-red-500" onClick={() => setOpen(false)}>
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
    </S.container>
  )
}

const quantityProduct = (orderProduct: GetOrderProduct[]) => {
  return orderProduct.reduce((acc, product) => {
    return acc + product.quantity
  }, 0)
}

const priceProduct = (orderProduct: GetOrderProduct[]) => {
  return orderProduct.reduce((acc, product) => {
    return acc + product.total
  }, 0)
}

const filterCategory = (orderProduct: GetOrderProduct[], category: string) => {
  return orderProduct.filter((product) => product.category.name === category)
}

const Divider = () => {
  return <div className="mx-2 w-full border-b border-dashed border-black" />
}
