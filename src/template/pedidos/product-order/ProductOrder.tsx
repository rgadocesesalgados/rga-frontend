import { FormDataPedidos } from '@/app/pedidos/types'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { CategoryProps } from '@/template/categorias/types'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

interface ProductOrderProps {
  index: number
  category: CategoryProps
}

export const ProductOrder = ({ index, category }: ProductOrderProps) => {
  const orderProducts = useFieldArray<FormDataPedidos>({ name: `orderProduct.${index}` })
  const methods = useFormContext<FormDataPedidos>()
  const { products } = useContextProduct()
  return (
    <div className="my-10 flex flex-col gap-3">
      <Label className="mb-3 font-bold capitalize">{category.name}</Label>
      {orderProducts?.fields.map((field, fieldIndex) => {
        const quantityProduct = methods.watch(`orderProduct.${index}.${fieldIndex}.quantity`)
        const priceProduct = methods.watch(`orderProduct.${index}.${fieldIndex}.price`)

        const calculateTotal = (priceProduct: number) => {
          if (!priceProduct || quantityProduct < 0 || !quantityProduct) return 0

          return priceProduct * quantityProduct
        }

        return (
          <div key={field.id} className="grid grid-cols-2 gap-3 rounded-xl py-3 even:bg-slate-50 ">
            <SelectSearch
              label="Produto"
              control={methods.control}
              name={`orderProduct.${index}.${fieldIndex}.product_id`}
              data={products
                .filter((product) => product.category_id === category.id)
                .map((product) => ({ label: product.name, value: product.id }))}
              onSelect={(value) => {
                methods.setValue(`orderProduct.${index}.${fieldIndex}.product_id`, value)
                methods.setValue(
                  `orderProduct.${index}.${fieldIndex}.price`,
                  products.find((product) => product.id === value)?.price,
                )

                const priceProduct = calculateTotal(products?.find((product) => product.id === value)?.price)

                methods.setValue(`orderProduct.${index}.${fieldIndex}.total`, priceProduct)
              }}
            />

            <InputForm
              control={methods.control}
              name={`orderProduct.${index}.${fieldIndex}.quantity`}
              label="Quatidade"
              type="number"
              typeof="numeric"
              onChange={(event) => {
                methods.setValue(`orderProduct.${index}.${fieldIndex}.total`, +event.target?.value * priceProduct)
              }}
            />

            <InputForm
              control={methods.control}
              name={`orderProduct.${index}.${fieldIndex}.price`}
              label="Preço/R$"
              type="number"
              typeof="numeric"
              step={0.01}
              onChange={(event) => {
                methods.setValue(`orderProduct.${index}.${fieldIndex}.total`, +event.target?.value * quantityProduct)
              }}
            />

            <InputForm
              control={methods.control}
              name={`orderProduct.${index}.${fieldIndex}.total`}
              label="Total/R$"
              type="number"
              min={0}
              step={0.01}
            />

            <Button
              type="button"
              variant="destructive"
              onClick={() => orderProducts.remove(fieldIndex)}
              size="icon"
              className="self-end"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      })}
      <Button variant="outline" type="button" onClick={() => orderProducts.append({})}>
        Adiconar
        <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
