import { Sform } from '@/app/login/styles'
import { Button } from '@/components/comum/Button'
import Input from '@/components/comum/Input'

export default function Categorias() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl">Categorias</h1>

      <Sform>
        <Input label="Nome" />

        <div className="flex gap-5">
          <Button color="outline">Cancelar</Button>
          <Button className="flex-1">Salvar</Button>
        </div>
      </Sform>
    </div>
  )
}
