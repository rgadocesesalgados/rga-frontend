import * as S from './styles'

import { FormDataPedidos } from '@/app/pedidos/types'
import { useBoxes, useOrder } from '@/app/pedidos/useFormCorePedidos'
import { toBRL } from '@/app/utils/toBRL'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectForm } from '@/components/ui-componets/select-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { Button } from '@/components/ui/button'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { CategoryProps } from '@/template/categorias/types'
import { PlusCircle, Trash2, XCircle } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

interface ProductOrderProps {
  index: number
  category: CategoryProps
}

export const Boxes = ({ category, index: categoryIndex }: ProductOrderProps) => {
  const methods = useFormContext<FormDataPedidos>()
  const box = useFieldArray({ name: `boxes.${categoryIndex}`, control: methods.control })

  return (
    <S.container>
      <S.labelHead>{category.name}</S.labelHead>
      {box?.fields.map((field, boxIndex) => (
        <>
          <Box
            key={field.id}
            categoryIndex={categoryIndex}
            boxIndex={boxIndex}
            category={category}
            boxDelete={box.remove}
            boxesSize={category.boxes}
          />
        </>
      ))}

      <Button type="button" onClick={() => box.append({ products: [{}] })}>
        Adiconar caixa
        <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </S.container>
  )
}

const Box = ({
  boxIndex,
  categoryIndex,
  category,
  boxDelete,
  boxesSize,
}: {
  boxIndex: number
  categoryIndex: number
  category: CategoryProps
  boxDelete: (boxIndex: number) => void
  boxesSize: number[]
}) => {
  const methods = useFormContext<FormDataPedidos>()
  const { products } = useContextProduct()
  const { executeCalculateTotal } = useOrder()

  const { setProductId, setProductPrice, setProductTotalPrice, getProductTotalPrice, getProducts } = useBoxes(
    categoryIndex,
    boxIndex,
  )
  const prod = useFieldArray({
    name: `boxes.${categoryIndex}.${boxIndex}.products`,
    control: methods.control,
    rules: { minLength: 1 },
  })

  const quantity = methods
    .watch(`boxes.${categoryIndex}.${boxIndex}`)
    ?.products?.reduce((acc, item) => acc + (+item.quantity || 0), 0)

  const price = methods
    .watch(`boxes.${categoryIndex}.${boxIndex}`)
    ?.products?.reduce((acc, item) => acc + (+item.total || 0), 0)

  return (
    <div className="flex flex-col gap-3 p-5 even:bg-slate-50">
      <div className="self-start">
        <SelectForm
          label="Tamanho"
          control={methods.control}
          name={`boxes.${categoryIndex}.${boxIndex}.size`}
          data={boxesSize.map((size) => ({ label: `${size} unidades`, value: `${size}` }))}
        />
      </div>

      {prod.fields.map(({ id }, productIndex) => {
        return (
          <S.containerProduct key={id}>
            <InputForm
              autoFocus
              control={methods.control}
              name={`boxes.${categoryIndex}.${boxIndex}.products.${productIndex}.quantity`}
              placeholder="Quatidade"
              type="number"
              typeof="numeric"
              min={0}
              onChange={() => {
                setProductTotalPrice({ productIndex, value: getProductTotalPrice(productIndex) })
                executeCalculateTotal()
              }}
              showMessageError
            />

            <SelectSearch
              control={methods.control}
              name={`boxes.${categoryIndex}.${boxIndex}.products.${productIndex}.product_id`}
              data={getProducts(products, category)}
              onSelect={(value) => {
                setProductId({ productIndex, value })
                setProductPrice({
                  productIndex,
                  value: products.find((product) => product.id === value)?.price,
                })
                setProductTotalPrice({ productIndex, value: getProductTotalPrice(productIndex) })
                executeCalculateTotal()
              }}
              showMessageError
            />

            <InputForm
              control={methods.control}
              name={`boxes.${categoryIndex}.${boxIndex}.products.${productIndex}.price`}
              placeholder="R$/un"
              type="number"
              typeof="numeric"
              step={0.01}
              min={0}
              onChange={() => {
                setProductTotalPrice({ productIndex, value: getProductTotalPrice(productIndex) })
                executeCalculateTotal()
              }}
              showMessageError
            />

            <InputForm
              control={methods.control}
              name={`boxes.${categoryIndex}.${boxIndex}.products.${productIndex}.total`}
              placeholder="Total/R$"
              type="number"
              typeof="numeric"
              min={0}
              step={0.01}
              onChange={() => {
                executeCalculateTotal()
              }}
              showMessageError
            />
            {productIndex !== 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  prod.remove(productIndex)
                }}
                className="text-red-500"
              >
                <XCircle className=" h-4 w-4" />
              </Button>
            )}
          </S.containerProduct>
        )
      })}

      <div className="flex justify-between gap-2">
        <Button onClick={() => prod.append({})} type="button" size="sm">
          <PlusCircle className="h-4 w-4" />
        </Button>

        <div className="flex gap-2 font-bold">
          <div>{quantity} un</div>
          <div>-</div>
          <div>{toBRL(price)}</div>
        </div>
        <Button
          type="button"
          size="icon"
          onClick={() => {
            boxDelete(boxIndex)
          }}
          variant="outline"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  )
}
