'use client'
import { api } from '@/services/api/apiClient'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface Tooper {
  id: string
  client_name: string
  date: Date
  hour: string
  tema: string
  name: string
  idade: number
  banner: string
  description: string
}

const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export default function Toppers() {
  const [data, setData] = useState<Tooper[]>([])

  useEffect(() => {
    api
      .get('/toppers')
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
    <div className="grid grid-cols-4 divide-x divide-y">
      {data?.map((topper) => {
        const date = new Date(topper.date)
        return (
          <div key={topper.id} className="p-10">
            <div className="flex justify-between font-bold">
              <div>{topper.client_name}</div>
              <div>{date.toLocaleDateString()}</div>
            </div>

            <div>Tema: {topper.tema}</div>

            <div className="flex gap-2">
              {topper.name && <div>{topper.name}</div>} - {topper.idade && <div>{topper.idade}</div>}
            </div>

            <div className="py-2">
              <pre>{topper.description}</pre>
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
