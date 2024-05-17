import * as S from './styles'
import { FormDataPedidos } from '@/app/pedidos/types'
import { Button } from '@/components/ui/button'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { TopperForm } from '../topper-form'
import { Cake } from './Cake'
import { useDeleteCake } from '@/contexts/delete-cake'

export const CakesFullForm = () => {
  const methods = useFormContext<FormDataPedidos>()
  const { fields, append, remove } = useFieldArray({ name: 'cakes', control: methods.control })
  const cakes = methods.watch('cakes')

  const { handleSetDeleteCake } = useDeleteCake()

  return (
    <S.container>
      <S.label>Bolos</S.label>

      {fields.map((field, index) => {
        return (
          <Cake key={field.id} cakeIndex={index}>
            {cakes && cakes[index]?.tem_topper && <TopperForm CakeIndex={index} />}

            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                remove(index)
                handleSetDeleteCake(field.id)
              }}
              className="text-red-500 "
            >
              Remover bolo
              <Trash2 className=" ml-2 h-4 w-4" />
            </Button>
          </Cake>
        )
      })}
      <Button
        type="button"
        onClick={() => append({ formato: 'REDONDO', massa: 'BRANCA', cobertura: 'CHANTILLY', topper: { price: 15 } })}
      >
        Adicionar bolo <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </S.container>
  )
}
