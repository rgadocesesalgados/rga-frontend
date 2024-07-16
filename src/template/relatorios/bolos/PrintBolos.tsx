'use client'

import * as S from './styles'

import { Button } from '@/components/ui/button'
import { useModalPrint } from '@/contexts/modalPrint'
import { GetRelatorio } from '@/types/relatorios/get'
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
} as const

const noto_sans = Noto_Sans({ subsets: ['latin'], weight: '400' })
export const PrintBolos = ({ data }: { data: GetRelatorio['bolos'] }) => {
  const { handleOpen } = useModalPrint()
  const [showButton, setShowButton] = useState(true)

  const dataSorted = data?.reduce(
    (acc, item) => {
      if (item.banner) acc.push(item)

      if (!item.banner) acc.unshift(item)
      return acc
    },
    [] as GetRelatorio['bolos'],
  )

  return (
    <S.container className={noto_sans.className}>
      {dataSorted?.map((bolo, index) => {
        const date = new Date(bolo.date)

        return (
          <S.cake key={index}>
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
                <S.weight>{bolo.peso}kg</S.weight>

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
                  <p>{bolo.description}</p>
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
  )
}
