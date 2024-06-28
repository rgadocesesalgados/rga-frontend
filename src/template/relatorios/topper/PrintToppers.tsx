'use client'
import { Button } from '@/components/ui/button'
import { useModalPrint } from '@/contexts/modalPrint'
import { GetRelatorio } from '@/types/relatorios/get'
import { useState } from 'react'

export const PrintToppers = ({ data }: { data: GetRelatorio['toppers'] }) => {
  const { handleOpenTopper } = useModalPrint()
  const [showButton, setShowButton] = useState(true)
  return (
    <div className="absolute top-0 grid w-full border-collapse grid-cols-4 divide-x divide-y bg-white text-sm">
      {data?.map((topper, index) => (
        <div
          key={index}
          className="h-min break-inside-avoid break-after-auto bg-white
p-5"
        >
          <div className="mb-5 flex gap-5 font-bold">
            <div>{topper.client}</div>
            {new Date(topper.date).getDate()}/0{new Date(topper.date).getMonth()}
          </div>
          <div className="font-bold">{topper.peso}kg</div>
          <div>{topper.tema}</div>
          <div className="py-5">{topper.description}</div>
          <div>
            {topper.name} - {topper.idade}
          </div>
          {topper.banner && <img src={topper.banner} alt="imagem do bolo" className="w-full rounded-2xl" />}
        </div>
      ))}

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
