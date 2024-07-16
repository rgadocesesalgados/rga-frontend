'use client'
import { Button } from '@/components/ui/button'
import { useModalPrint } from '@/contexts/modalPrint'
import { GetRelatorio } from '@/types/relatorios/get'
import { useState } from 'react'

const day = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] as const

export const PrintToppers = ({ data }: { data: GetRelatorio['toppers'] }) => {
  const { handleOpenTopper } = useModalPrint()
  const [showButton, setShowButton] = useState(true)

  return (
    <div className="absolute top-0 grid w-full border-collapse grid-cols-4 divide-x divide-y bg-white text-[0.5rem]">
      {data?.map((topper, index) => {
        const date = new Date(topper.date)

        return (
          <div
            key={index}
            className="h-min break-inside-avoid break-after-auto bg-white
p-5"
          >
            <div className="mb-5 flex gap-5 font-bold">
              <div>{topper.client}</div>
              {`${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`}/
              {`${date.getMonth()}`.length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}
            </div>
            <div className="font-bold">{topper.peso}kg</div>
            <div>{topper.tema}</div>
            <div className="py-5">
              <pre>{topper.description}</pre>
            </div>
            <div>
              {topper.name} - {topper.idade}
            </div>

            <div className="flex justify-between py-2">
              <div>{day[date.getDay()]}</div>
              <div className="font-bold text-red-500">{topper.hour}</div>
            </div>
            {topper.banner && <img src={topper.banner} alt="imagem do bolo" className="w-full rounded-2xl" />}
          </div>
        )
      })}

      {showButton && (
        <div className="fixed right-16 top-10 flex ">
          <Button
            variant="ghost"
            className="text-red-500"
            onClick={() => {
              handleOpenTopper()
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
