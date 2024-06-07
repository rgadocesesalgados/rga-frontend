'use client'
import { Button } from '@/components/ui/button'
import { useModalPrint } from '@/contexts/modalPrint'
import { GetRelatorio } from '@/types/relatorios/get'
import { useState } from 'react'

const day = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] as const

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
    <div className="absolute top-0 grid w-full border-collapse grid-cols-4 divide-x divide-y bg-white text-sm">
      {dataSorted?.map((bolo, index) => {
        const date = new Date(bolo.date)
        return (
          <div key={index} className="h-min break-inside-avoid break-after-auto bg-white p-5 text-sm">
            <div className="flex justify-between">
              <div>
                {`${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`}/
                {`${date.getMonth()}`.length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}
              </div>
            </div>
            <div className="mb-5 font-bold">{bolo.client}</div>
            <div className="font-bold">{bolo.peso}kg</div> {bolo.recheio.map((r) => r.name).join(', ')}
            <div>{bolo.formato}</div>
            <div className="capitalize">{bolo.cobertura.toLocaleLowerCase()}</div>
            <div className="py-5">{bolo.description}</div>
            <div className="flex justify-between">
              {bolo.hour} <span className="text-red-500">{day[new Date(bolo.date).getDay()]}</span>
            </div>
            {bolo.banner && <img src={bolo.banner} alt="imagem do bolo" className="w-full rounded-2xl" />}
          </div>
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
    </div>
  )
}
