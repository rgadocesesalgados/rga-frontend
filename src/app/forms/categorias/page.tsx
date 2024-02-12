'use client'

import { Sform } from '@/app/login/styles'
import { Button } from '@/components/comum/Button'
import Input from '@/components/comum/Input'
import { useRouter } from 'next/navigation'

export default function Categorias() {
  const router = useRouter()
  const cancel = () => {
    router.push('/categorias')
  }
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl">Categorias</h1>

      <Sform>
        <Input label="Nome" />

        <div className="flex gap-5">
          <Button color="outline" type="button" onClick={cancel}>
            Cancelar
          </Button>
          <Button className="flex-1">Salvar</Button>
        </div>
      </Sform>
    </div>
  )
}
