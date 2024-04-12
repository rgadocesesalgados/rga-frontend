import { DevTool } from '@hookform/devtools'

import { FormDataPedidos } from '@/app/pedidos/types'

import Modal from '@/components/comum/Modal'
import { MFooter } from '@/components/comum/Modal/components/MFooter'
import { Form } from '@/components/ui/form'

import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextClient } from '@/contexts/dataContexts/clientesContext/useContextClient'
// import { useContextPedidos } from '@/contexts/dataContexts/ordersContext/useContextPedidos'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { ModalTemplateProps } from '@/template/types'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { PlusCircle, Trash2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { DatePickerForm } from '@/components/ui-componets/date-picker'
import { TextareaForm } from '@/components/ui-componets/textarea-form'
import { CheckboxForm } from '@/components/ui-componets/checkbox-form/CheckboxForm'
import { SelectForm } from '@/components/ui-componets/select-form/SelectForm'
import { FormPayment } from '../FormPayments'
import { CakesFullForm } from '../cakes-full-form'

export const ModalPedidos = ({ isOpen, closeModal }: ModalTemplateProps) => {
  const { clients } = useContextClient()
  const { categorys } = useContextCategory()
  const { products } = useContextProduct()
  const { address } = useContextAddress()
  // const { addOrder, getAllOrders } = useContextPedidos()

  const closeModalPedidos = () => {
    // reset()
    closeModal()
  }

  const methods = useFormContext<FormDataPedidos>()

  const orderProduct = methods.watch('orderProduct')
  const isDelivery = methods.watch('delivery')
  const typeFrete = methods.watch('logistic')
  const addess_id = methods.watch('address')
  const total = methods.watch('total')
  const valueFrete = methods.watch('value_frete')

  const totalOrderCalculate = () => {
    const totalOrder = orderProduct?.reduce(
      (acc, item) => acc + item.reduce((acc2, item2) => acc2 + +item2.total, 0),
      0,
    )

    return (+total || 0) + (+totalOrder || 0) + (+valueFrete || 0)
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModalPedidos} title="Pedido">
      <Form {...methods}>
        <form
          className="mx-auto w-11/12 space-y-8 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-6/12"
          onSubmit={methods.handleSubmit((data) => console.log(data))}
        >
          <InputForm control={methods.control} name="id" readOnly className="hidden" />

          <SelectSearch
            name="client"
            label="Cliente"
            control={methods.control}
            data={clients.map((client) => ({ label: client.name, value: client.id }))}
            onSelect={(value) => {
              methods.setValue('client', value)
            }}
          />

          <DatePickerForm control={methods.control} name="data" label="Data" />

          <InputForm control={methods.control} name="hour" label="Hora" type="time" />

          <CakesFullForm />

          {categorys?.map((category, index) => {
            const orderProducts = useFieldArray<FormDataPedidos>({ name: `orderProduct.${index}` })

            return (
              <div key={category.id} className="flex flex-col gap-3">
                <Label className="mb-3 font-bold capitalize">{category.name}</Label>
                {orderProducts?.fields.map((field, fieldIndex) => {
                  const quantityProduct = orderProduct[index][fieldIndex].quantity

                  const calculateTotal = (priceProduct: number) => {
                    if (!priceProduct || quantityProduct < 0 || !quantityProduct) return 0

                    return priceProduct * quantityProduct
                  }

                  return (
                    <div
                      key={field.id}
                      className="grid grid-cols-2 gap-3 rounded-xl py-3 even:bg-slate-50 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    >
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
                          methods.setValue(
                            `orderProduct.${index}.${fieldIndex}.total`,
                            +event.target?.value * orderProduct[index][fieldIndex].price,
                          )
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
                          methods.setValue(
                            `orderProduct.${index}.${fieldIndex}.total`,
                            +event.target?.value * orderProduct[index][fieldIndex].quantity,
                          )
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
          })}

          <InputForm
            control={methods.control}
            name="cor_forminhas"
            label="Cor das forminhas"
            placeholder="Se tiver doces, adicione a cor da forminha aqui"
          />

          <TextareaForm control={methods.control} name="observations" placeholder="Observações" label="Observações" />

          <CheckboxForm
            control={methods.control}
            name="delivery"
            label="Entrega"
            description="Se for entrega marque essa caixinha"
            onChange={(e) => {
              if (!e.target.value) {
                methods.resetField('value_frete')
                methods.resetField('logistic')
                methods.resetField('address')
              }
            }}
          />

          {isDelivery && (
            <>
              <SelectSearch
                control={methods.control}
                name="address"
                label="Endereço"
                showMessageError
                data={address.map((addressItem) => ({ label: addressItem.address_complete, value: addressItem.id }))}
                onSelect={(value) => {
                  const addressSelect = address.find((address) => address.id === value)

                  methods.setValue('address', value)
                  methods.setValue('value_frete', addressSelect[typeFrete.toLowerCase()])
                }}
              />

              <SelectForm
                control={methods.control}
                name="logistic"
                data={[
                  { label: 'Frete moto', value: 'FRETE_MOTO' },
                  { label: 'Frete carro', value: 'FRETE_CARRO' },
                ]}
                label="Tipo do frete"
                onChange={(e) => {
                  const value: string = e.target.value
                  const addressSelect = address.find((address) => address.id === addess_id)
                  alert(addressSelect)
                  methods.setValue('value_frete', addressSelect ? addressSelect[value.toLocaleLowerCase()] : 0)
                }}
              />

              <InputForm
                control={methods.control}
                name="value_frete"
                placeholder="R$ 0,00"
                type="number"
                typeof="numeric"
                step={0.01}
                label="Valor do frete/R$"
                showMessageError
              />
            </>
          )}

          <InputForm
            control={methods.control}
            name="total"
            type="number"
            typeof="numeric"
            value={totalOrderCalculate()}
            readOnly
            placeholder="R$ 00,00"
            label="Total R$"
            description="Total do pedido. Somente leitura, não é possivel alterar o total"
          />

          <SelectForm
            control={methods.control}
            name="status"
            data={[
              { label: 'Rascunho', value: 'RASCUNHO' },
              { label: 'Anotado', value: 'ANOTADO' },
              { label: 'Em produção', value: 'EM_PRODUCAO' },
              { label: 'Entregue', value: 'ENTREGUE' },
              { label: 'Cancelado', value: 'CANCELADO' },
            ]}
            label="Status"
            showMessageError
          />

          <FormPayment />

          <MFooter>
            <Button type="submit">Salvar</Button>
          </MFooter>
        </form>
      </Form>
      <DevTool control={methods.control} styles={{ button: { width: 40, height: 40 } }} />
    </Modal>
  )
}
