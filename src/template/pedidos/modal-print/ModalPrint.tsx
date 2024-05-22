'use client'
import { useView } from '@/contexts/view'
import * as S from './styles'

import { useModalPrint } from '@/contexts/modalPrint'
import { useContextOrders } from '@/contexts/dataContexts/ordersContext/useContextOrders'
import { toBRL } from '@/app/utils/toBRL'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const ModalPrint = () => {
  const [showButtonPrint, setShowButtonPrint] = useState(true)
  const { orders } = useContextOrders()
  const { id } = useView()

  const orderSelected = orders.find((order) => order.id === id)

  const { open } = useModalPrint()

  return (
    <S.container data-open={open}>
      <S.content>
        <S.nameAndDate>
          <S.name>{orderSelected?.client.name}</S.name>

          <S.date>{new Date(orderSelected?.date).toLocaleDateString()}</S.date>
        </S.nameAndDate>

        <p>{orderSelected?.client.tel}</p>

        <S.containerCakes>
          {orderSelected?.bolo.map((cake) => {
            return (
              <S.cake key={cake.id}>
                <div className="flex gap-2">
                  <div>{cake.peso}kg</div> {cake.recheio.map((recheio) => recheio.name).join(', ')}
                </div>

                <div className="capitalize">
                  {cake.formato.toLocaleLowerCase()} {toBRL(cake.price)}
                </div>

                <div>Massa {cake.massa.toLocaleLowerCase()}</div>

                <div>Cobertura: {cake.cobertura}</div>

                {cake.description && <div>Descrição: {cake.description}</div>}

                {cake.topper && (
                  <div>
                    <div>
                      <div>Tem topper</div>

                      <div>{toBRL(cake.topper.price)}</div>
                    </div>

                    <div>{cake.topper.tema}</div>
                    <div>
                      {cake.topper.name} - {cake.topper.idade}
                    </div>

                    {cake.topper.description && <div>{cake.topper.description}</div>}
                  </div>
                )}
              </S.cake>
            )
          })}
        </S.containerCakes>
      </S.content>

      {showButtonPrint && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setShowButtonPrint(false)
            setTimeout(() => {
              window.print()
              setShowButtonPrint(true)
            }, 10)
          }}
          className="text-red-500"
        >
          Imprimir
        </Button>
      )}
    </S.container>
  )
}
