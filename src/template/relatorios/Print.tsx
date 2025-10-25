'use client'

import * as S from './bolos/styles'

import { Button } from '@/components/ui/button'
import { useModalPrint } from '@/contexts/modalPrint'
import { GetRelatorio } from '@/types/relatorios/get'
import { Bike, Truck } from 'lucide-react'
import { Noto_Sans } from 'next/font/google'
import { useState } from 'react'

const day = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] as const
const massa = {
  MASSA_MESCLADA: 'Massa mesclada',
  BRANCA: 'Massa branca',
  CHOCOLATE: 'Massa chocolate',
} as const

const cobertura = {
  AVELA_BATIDO: 'Avelã batido',
  CLARA_QUEIMADA: 'Clara queimada',
  CHANTILLY: 'Chantilly',
  NATA: 'Nata',
  KIT_KAT: 'Kit Kat',
} as const

const noto_sans = Noto_Sans({ subsets: ['latin'], weight: '400' })
export const PrintBolos = ({ cakes, boxes }: { cakes: GetRelatorio['bolos']; boxes: GetRelatorio['boxes'] }) => {
  const { handleOpen } = useModalPrint()
  const [showButton, setShowButton] = useState(true)

  return (
    <div className="min-h-svh bg-white">
      <S.container className={noto_sans.className}>
        {cakes?.map((bolo, index) => {
          const date = new Date(bolo.date)

          return (
            <S.cake key={index} data-image={!!bolo.banner} className="border data-[image=true]:row-span-2">
              <div>
                <S.day>
                  {`${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`}/
                  {`${date.getMonth()}`.length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}
                </S.day>

                <S.customer>{bolo.client}</S.customer>
              </div>

              <S.cakeBatterContainer>
                {bolo.massa !== 'BRANCA' && (
                  <S.cakeBatter>
                    {massa[bolo.massa]}
                    <S.atention>*</S.atention>
                  </S.cakeBatter>
                )}

                <S.noWrap>
                  <S.weight>{bolo.peso == 0.6 ? 'Bento cake' : `${bolo.peso}kg`}</S.weight>

                  <S.shape>{bolo.formato.toLocaleLowerCase()}</S.shape>
                </S.noWrap>
              </S.cakeBatterContainer>

              <div>
                {bolo.recheio.map((r) => (
                  <S.filling key={r.name}>{r.name}</S.filling>
                ))}
              </div>

              <div>
                {bolo.cobertura === 'CHANTILLY' && !bolo.description && !bolo.banner && <S.cover>Normal</S.cover>}

                {bolo.cobertura !== 'CHANTILLY' && <S.cover>{cobertura[bolo.cobertura]}</S.cover>}

                {bolo.description && (
                  <S.description>
                    {bolo.description.split('\n').map((item, i) => (
                      <div key={i} className="pt-1">
                        {item}
                      </div>
                    ))}
                  </S.description>
                )}

                <div className="flex gap-2">
                  {bolo.banner ? (
                    <S.model>
                      TM<S.atention>*</S.atention>
                    </S.model>
                  ) : (
                    <S.model>
                      NTM<S.atention>*</S.atention>
                    </S.model>
                  )}

                  {bolo.topper ? (
                    <S.model>
                      TT<S.atention>*</S.atention>
                    </S.model>
                  ) : (
                    <S.model>
                      ST<S.atention>*</S.atention>
                    </S.model>
                  )}
                </div>
              </div>

              <S.dayAndHourContainer>
                {bolo.hour} <S.atention>{day[new Date(bolo.date).getDay()]}</S.atention>
              </S.dayAndHourContainer>

              {bolo.banner && <S.banner src={bolo.banner} alt="imagem do bolo" />}
            </S.cake>
          )
        })}

        {boxes.map(({ client, date, delivery, hour, id, products, type_frete }) => (
          <div
            key={id}
            className="h-min break-inside-avoid break-after-auto border
        bg-white p-5"
          >
            <div className="mb-5 flex gap-5 font-bold">
              <div>{client}</div>
              {new Date(date).getDate()}/0{new Date(date).getMonth() + 1}
            </div>
            {products.map((product) => (
              <div key={product.id}>
                <div>
                  - {product.quantity} {product.name}
                </div>
              </div>
            ))}

            <div className="flex items-baseline justify-between pt-5">
              <div>
                {delivery && (
                  <div>
                    {type_frete === 'FRETE_CARRO' && (
                      <div>
                        <Truck className="h-5 w-5" />
                      </div>
                    )}

                    {type_frete === 'FRETE_MOTO' && (
                      <div>
                        <Bike className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                )}
                <div>{hour}</div>
              </div>
              <div className="text-red-500">{day[new Date(date).getDay()]}</div>
            </div>
          </div>
        ))}
        {showButton && (
          <div className="fixed right-16 top-10 flex ">
            <Button
              variant="ghost"
              className="text-red-500"
              onClick={() => {
                handleOpen()
              }}
            >
              Voltar
            </Button>
            <Button
              onClick={() => {
                setShowButton(false)

                setTimeout(() => {
                  window.print()
                  setShowButton(true)
                }, 100)
              }}
            >
              Imprimir
            </Button>
          </div>
        )}
      </S.container>
    </div>
  )
}
