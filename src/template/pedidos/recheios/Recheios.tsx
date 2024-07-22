import * as S from './styles'

import { FormDataPedidos } from '@/app/pedidos/types'
import { useFormCorePedidos } from '@/app/pedidos/useFormCorePedidos'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { Button } from '@/components/ui/button'
import { useContextRecheios } from '@/contexts/dataContexts/recheios/useContextRecheios'
import { Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

interface RecheiosProps {
  recheioIndex: number
  cakeIndex: number
  remove: (index: number) => void
}
export const Recheios = ({ cakeIndex, recheioIndex, remove }: RecheiosProps) => {
  const methods = useFormContext<FormDataPedidos>()
  const cake = useFormCorePedidos()

  const { recheios } = useContextRecheios()

  return (
    <S.contentProduct>
      <SelectSearch
        control={methods.control}
        name={`cakes.${cakeIndex}.recheios.${recheioIndex}.id`}
        data={recheios.map((recheio) => ({ value: recheio.id, label: recheio.name }))}
        onSelect={(recheioId) => {
          methods.setValue(`cakes.${cakeIndex}.recheios.${recheioIndex}.id`, recheioId)

          const recheio = recheios.find(({ id }) => id === recheioId)

          methods.setValue(`cakes.${cakeIndex}.recheios.${recheioIndex}.price`, recheio?.price)

          methods.setValue(`cakes.${cakeIndex}.recheios.${recheioIndex}.price_fixed`, recheio?.price_fixed)

          methods.setValue(`cakes.${cakeIndex}.price`, cake.getPriceCake(cakeIndex))
        }}
        className="flex-1"
      />

      <Button
        size="icon"
        variant="secondary"
        type="button"
        onClick={() => {
          remove(recheioIndex)
          methods.setValue(`cakes.${cakeIndex}.price`, cake.getPriceCake(cakeIndex))
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </S.contentProduct>
  )
}
