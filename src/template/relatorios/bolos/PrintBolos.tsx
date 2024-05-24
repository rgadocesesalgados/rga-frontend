'use client'
import { Button } from '@/components/ui/button'
import { useModalPrint } from '@/contexts/modalPrint'
import { GetRelatorio } from '@/types/relatorios/get'
import { useState } from 'react'

export const PrintBolos = ({ data }: { data: GetRelatorio['bolos'] }) => {
  const { handleOpen } = useModalPrint()
  const [showButton, setShowButton] = useState(true)
  return (
    <div className="absolute top-0 grid w-full border-collapse grid-cols-4 divide-x divide-y bg-white text-sm">
      {data?.map((bolo, index) => (
        <div key={index} className="h-min bg-white p-5">
          <div>
            {new Date(bolo.date).getDate()}/0{new Date(bolo.date).getMonth()}
          </div>
          <div className="mb-5 font-bold">{bolo.client}</div>
          <div className="font-bold">{bolo.peso}kg</div> {bolo.recheio.map((r) => r.name).join(', ')}
          <div className="capitalize">{bolo.cobertura.toLocaleLowerCase()}</div>
          <div className="py-5">{bolo.description}</div>
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
    </div>
  )
}
