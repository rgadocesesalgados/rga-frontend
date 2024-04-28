import * as S from './styles'

import { FormDataPedidos } from '@/app/pedidos/types'
import { useFormCorePedidos } from '@/app/pedidos/useFormCorePedidos'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { Button } from '@/components/ui/button'
import { useContextRecheios } from '@/contexts/dataContexts/recheios/useContextRecheios'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const Recheios = ({ index }: { index: number }) => {
  const { recheios } = useContextRecheios()
  const { fields, append, remove } = useFieldArray<FormDataPedidos>({ name: `cakes.${index}.recheios` })
  const methods = useFormContext<FormDataPedidos>()
  const cake = useFormCorePedidos()

  return (
    <S.container>
      {fields.map((field, indexField) => (
        <S.contentProduct key={field.id}>
          <SelectSearch
            control={methods.control}
            name={`cakes.${index}.recheios.${indexField}.id`}
            data={recheios.map((recheio) => ({ value: recheio.id, label: recheio.name }))}
            onSelect={(recheioId) => {
              methods.setValue(`cakes.${index}.recheios.${indexField}.id`, recheioId)
              methods.setValue(
                `cakes.${index}.recheios.${indexField}.price`,
                recheios.find(({ id }) => id === recheioId)?.price,
              )
              methods.setValue(`cakes.${index}.price`, cake.getPriceCake(index))
            }}
            className="flex-1"
            label="Recheio"
          />
          <InputForm
            control={methods.control}
            name={`cakes.${index}.recheios.${indexField}.price`}
            onChange={() => {
              methods.setValue(`cakes.${index}.price`, cake.getPriceCake(index))
            }}
            placeholder="R$ 0,00"
            type="number"
            step={0.01}
            min={0}
            typeof="numeric"
            label="Preço do recheio"
          />
          <Button size="icon" variant="secondary" onClick={() => remove(indexField)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </S.contentProduct>
      ))}
      <Button type="button" onClick={() => append({})} className="w-min">
        Adicionar recheio
        <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </S.container>
  )
}
