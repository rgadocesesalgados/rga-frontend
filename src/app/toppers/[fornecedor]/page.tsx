'use client'
import { api } from '@/services/api/apiClient'
import { redirect, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface Tooper {
  id: string
  client_name: string
  date: Date
  peso: string
  hour: string
  tema: string
  name: string
  idade: number
  banner: string
  description: string
  recebido: boolean
  fornecedor: 'FORNECEDOR_PRINCIPAL' | 'FORNECEDOR_SECUNDARIO'
}

const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export default function Toppers() {
  const { fornecedor } = useParams<{ fornecedor: string }>()

  if (!['FORNECEDOR_PRINCIPAL', 'FORNECEDOR_SECUNDARIO'].includes(fornecedor)) redirect('/not-found')

  const [data, setData] = useState<Tooper[]>([])

  useEffect(() => {
    api
      .get(`/toppers/${fornecedor}`)
      .then((response) => {
        console.log(response.data)
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data?.error)
      })
  }, [])

  return (
    <div className="grid grid-cols-2 divide-x divide-y text-xs sm:grid-cols-4">
      {data?.map((topper) => {
        const date = new Date(topper.date)
        return (
          <div key={topper.id} className="p-10">
            <div className="mb-5 flex justify-between gap-1 font-bold">
              <div>
                {`${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`}/
                {`${date.getMonth()}`.length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}
              </div>
              <div>{topper.client_name}</div>
            </div>

            <div>{topper.peso}kg</div>

            <div>Tema: {topper.tema}</div>

            <div className="flex gap-2">
              {topper.name && <div>{topper.name}</div>} - {topper.idade && <div>{topper.idade}</div>}
            </div>

            <div className="py-2">
              <p>{topper.description}</p>
            </div>

            <div className="flex justify-between py-2 text-red-600">
              <div>{days[date.getDay()]}</div>
              <div>{topper.hour}</div>
            </div>

            {topper.banner && <img src={topper.banner} alt={topper.tema} className="w-full rounded-2xl" />}
          </div>
        )
      })}
    </div>
  )
}
