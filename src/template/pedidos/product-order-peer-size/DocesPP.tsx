import * as S from './styles'

import { FormDataPedidos } from '@/app/pedidos/types'
import { useDocesPP, useOrder } from '@/app/pedidos/useFormCorePedidos'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { Button } from '@/components/ui/button'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const DocesPP = () => {
  const docesPP = useFieldArray<FormDataPedidos>({ name: 'docesPP' })

  const { setProductId, setProductPrice, setProductTotalPrice, getProductTotalPrice, getProducts } = useDocesPP()

  const { control } = useFormContext<FormDataPedidos>()

  const { products } = useContextProduct()

  const { executeCalculateTotal } = useOrder()

  return (
    <S.container>
      <S.labelHead>Doces</S.labelHead>
      {docesPP?.fields.map((field, productIndex) => {
        return (
          <S.containerProduct key={field.id}>
            <InputForm
              control={control}
              name={`docesPP.${productIndex}.quantity`}
              label="Quatidade"
              type="number"
              typeof="numeric"
              min={0}
              onChange={() => {
                setProductTotalPrice({ productIndex, value: getProductTotalPrice(productIndex) })
                executeCalculateTotal()
              }}
            />

            <SelectSearch
              label="Produto"
              control={control}
              name={`docesPP.${productIndex}.product_id`}
              data={getProducts(products)}
              onSelect={(value) => {
                setProductId({ productIndex, value })
                setProductPrice({
                  productIndex,
                  value: products.find((product) => product.id === value)?.price,
                })
                setProductTotalPrice({ productIndex, value: getProductTotalPrice(productIndex) })
                executeCalculateTotal()
              }}
            />

            <InputForm
              control={control}
              name={`docesPP.${productIndex}.price`}
              label="Preço/R$"
              type="number"
              typeof="numeric"
              step={0.01}
              min={0}
              onChange={() => {
                setProductTotalPrice({ productIndex, value: getProductTotalPrice(productIndex) })
                executeCalculateTotal()
              }}
            />

            <InputForm
              control={control}
              name={`docesPP.${productIndex}.total`}
              label="Total/R$"
              type="number"
              typeof="numeric"
              min={0}
              step={0.01}
              onChange={executeCalculateTotal}
            />

            <Button type="button" variant="ghost" onClick={() => docesPP.remove(productIndex)} className="text-red-500">
              Remover produto
              <Trash2 className="ml-3 h-4 w-4" />
            </Button>
          </S.containerProduct>
        )
      })}
      <Button type="button" onClick={() => docesPP.append({})}>
        Adiconar
        <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </S.container>
  )
}
