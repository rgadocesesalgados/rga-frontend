import { Button } from '@/components/comum/Button'
import * as S from './styles'
import { FormDataPedidos } from '@/app/pedidos/types'
import Input from '@/components/comum/Input'
import { TButton } from '@/components/comum/Table/components/TButton'
import { CloseIcon } from '@/components/icon'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { InputSelect } from '@/components/comum/InputSelect'
import { ProductProps } from '@/app/produtos/types'
import { toBRL } from '@/app/utils/toBRL'

interface OrderItemProps {
  category: string
  index: number
  data: ProductProps[]
}

interface CalculateTotalProps {
  indexId: number
  indexField: number
}
export const OrderItem = ({ category, index, data }: OrderItemProps) => {
  const { fields, append, remove } = useFieldArray<FormDataPedidos>({ name: `orderProduct.${index}` })
  const { register, watch, setValue } = useFormContext<FormDataPedidos>()

  const calculateTotal = ({ indexId, indexField }: CalculateTotalProps) => {
    const quantity = watch(`orderProduct.${indexId}.${indexField}.quantity`) || 0
    const priceUnit =
      data.find(({ id }) => id === watch(`orderProduct.${indexId}.${indexField}.product_id`))?.price || 0

    setValue(`orderProduct.${indexId}.${indexField}.price`, +quantity * +priceUnit)
  }

  const orderProduct = watch(`orderProduct.${index}`)
  return (
    <S.container>
      <S.title>{category}</S.title>

      {fields?.map((field, fieldIndex) => {
        return (
          <S.containerInputs key={field.id}>
            <div className="flex items-center gap-3">
              <Input
                {...register(`orderProduct.${index}.${fieldIndex}.quantity`)}
                label="Quantidade"
                type="number"
                typeof="numeric"
                className="w-32"
                min={0}
              />

              <InputSelect
                label="Produto"
                data={data
                  .filter(({ category_name }) => category_name === category)
                  .map(({ id, name }) => ({ label: name, value: id }))}
                placeholder="Selecione o produto"
                inputid={`orderProduct.${index}.${fieldIndex}.product_id`}
                inputSearch={`orderProduct.${index}.${fieldIndex}.search`}
              />

              <TButton onClick={() => remove(fieldIndex)}>
                <CloseIcon />
              </TButton>
            </div>

            <Input
              {...register(`orderProduct.${index}.${fieldIndex}.price`)}
              label="Valor/R$"
              type="number"
              typeof="numeric"
              onFocus={() => calculateTotal({ indexId: index, indexField: fieldIndex })}
              step={0.01}
            />
          </S.containerInputs>
        )
      })}

      {!!fields.length && (
        <div className="flex items-baseline justify-between text-gray-500">
          <div className="  flex gap-3">
            <p>{orderProduct?.reduce((acc, { quantity }) => acc + +quantity, 0) || 0}</p>
            <p>unidades</p>
          </div>
          <div className="mx-2 flex-1 border-b-2 border-dashed border-gray-200" />
          <p>{toBRL(orderProduct?.reduce((acc, { price }) => acc + +price, 0))}</p>
        </div>
      )}

      <Button color="dash" onClick={() => append({})}>
        Adicionar {category}
      </Button>
    </S.container>
  )
}
