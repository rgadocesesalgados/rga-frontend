'use client'
import { Button } from '@/components/ui/button'
import { useModalPrint } from '@/contexts/modalPrint'
import { GetRelatorio } from '@/types/relatorios/get'
import { Bike, Truck } from 'lucide-react'
import { Noto_Sans } from 'next/font/google'
import { useState } from 'react'

const day = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] as const

const noto_sans = Noto_Sans({ subsets: ['latin'], weight: '400' })

export const PrintDocesPP = ({ data }: { data: GetRelatorio['docesPP'] }) => {
  const { handleOpenDocesPP } = useModalPrint()
  const [showButton, setShowButton] = useState(true)
  return (
    <div
      className={`absolute top-0 grid w-full border-collapse grid-cols-4 divide-x divide-y bg-white text-[0.5rem] text-xs ${noto_sans.className}`}
    >
      {data?.map((docesPP, index) => (
        <div
          key={index}
          className="h-min break-inside-avoid break-after-auto bg-white
p-5"
        >
          <div className="mb-5 flex gap-5 font-bold">
            <div>{docesPP.client}</div>
            {new Date(docesPP.date).getDate()}/0{new Date(docesPP.date).getMonth()}
          </div>
          {docesPP.products.map((product) => (
            <div key={product.name}>
              <div>
                - {product.quantity} {product.name}
              </div>
            </div>
          ))}

          <div className="flex items-baseline justify-between pt-5">
            <div>
              <div>
                {docesPP.type_frete === 'FRETE_CARRO' && (
                  <div>
                    <Truck className="h-5 w-5" />
                  </div>
                )}

                {docesPP.type_frete === 'FRETE_MOTO' && (
                  <div>
                    <Bike className="h-5 w-5" />
                  </div>
                )}
              </div>
              <div>{docesPP.hour}</div>
            </div>
            <div className="text-red-500">{day[new Date(docesPP.date).getDay()]}</div>
          </div>
        </div>
      ))}

      {showButton && (
        <div className="fixed right-16 top-10 flex ">
          <Button
            variant="ghost"
            className="text-red-500"
            onClick={() => {
              handleOpenDocesPP()
            }}
          >
            Voltar
          </Button>
          <Button
            onClick={() => {
              setShowButton(false)

              setTimeout(() => {
                window.print()
              }, 100)

              setTimeout(() => {
                setShowButton(true)
              }, 100)
            }}
          >
            Imprimir
          </Button>
        </div>
      )}
    </div>
  )
}
