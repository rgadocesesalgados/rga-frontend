import * as S from './styles'
import { FormDataPedidos } from '@/app/pedidos/types'
import { Button } from '@/components/ui/button'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { TopperForm } from '../topper-form'
import { Cake } from './Cake'

export const CakesFullForm = () => {
  const methods = useFormContext<FormDataPedidos>()
  const { fields, append, remove } = useFieldArray({ name: 'cakes', control: methods.control })
  const cakes = methods.watch('cakes')

  return (
    <S.container>
      <S.label>Bolos</S.label>

      {fields.map((field, index) => {
        return (
          <Cake key={field.id} index={index}>
            {cakes && cakes[index]?.tem_topper && <TopperForm CakeIndex={index} />}

            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                remove(index)
              }}
              className="text-red-500 "
            >
              Remover bolo
              <Trash2 className=" ml-2 h-4 w-4" />
            </Button>
          </Cake>
        )
      })}
      <Button type="button" onClick={() => append({ formato: 'REDONDO', massa: 'BRANCA' })}>
        Adicionar bolo <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </S.container>
  )
}
