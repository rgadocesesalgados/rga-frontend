import * as S from './styles'

import { FormDataPedidos } from '@/app/pedidos/types'
import { useOrder, useOrderProduct } from '@/app/pedidos/useFormCorePedidos'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { Button } from '@/components/ui/button'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { CategoryProps } from '@/template/categorias/types'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

interface ProductOrderProps {
  index: number
  category: CategoryProps
}

export const ProductOrder = ({ category, index: categoryIndex }: ProductOrderProps) => {
  const orderProducts = useFieldArray<FormDataPedidos>({ name: `orderProduct.${categoryIndex}` })

  const methods = useFormContext<FormDataPedidos>()

  const { products } = useContextProduct()

  const { setProductId, setProductPrice, setProductTotalPrice, getProductTotalPrice, getProducts } =
    useOrderProduct(categoryIndex)

  const { executeCalculateTotal } = useOrder()

  return (
    <S.container>
      <S.labelHead>{category.name}</S.labelHead>
      {orderProducts?.fields.map((field, productIndex) => {
        return (
          <S.containerProduct key={field.id}>
            <SelectSearch
              label="Produto"
              control={methods.control}
              name={`orderProduct.${categoryIndex}.${productIndex}.product_id`}
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
            />

            <InputForm
              control={methods.control}
              name={`orderProduct.${categoryIndex}.${productIndex}.quantity`}
              label="Quatidade"
              type="number"
              typeof="numeric"
              min={0}
              onChange={() => {
                setProductTotalPrice({ productIndex, value: getProductTotalPrice(productIndex) })
                executeCalculateTotal()
              }}
            />

            <InputForm
              control={methods.control}
              name={`orderProduct.${categoryIndex}.${productIndex}.price`}
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
              control={methods.control}
              name={`orderProduct.${categoryIndex}.${productIndex}.total`}
              label="Total/R$"
              type="number"
              typeof="numeric"
              min={0}
              step={0.01}
              onChange={executeCalculateTotal}
            />

            <Button
              type="button"
              variant="ghost"
              onClick={() => orderProducts.remove(productIndex)}
              className="text-red-500"
            >
              Remover produto
              <Trash2 className="ml-3 h-4 w-4" />
            </Button>
          </S.containerProduct>
        )
      })}
      <Button type="button" onClick={() => orderProducts.append({})}>
        Adiconar
        <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </S.container>
  )
}
