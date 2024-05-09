import { FormDataPedidos } from '@/app/pedidos/types'

import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextClient } from '@/contexts/dataContexts/clientesContext/useContextClient'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { PlusCircle } from 'lucide-react'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { DatePickerForm } from '@/components/ui-componets/date-picker'
import { TextareaForm } from '@/components/ui-componets/textarea-form'
import { CheckboxForm } from '@/components/ui-componets/checkbox-form/CheckboxForm'
import { SelectForm } from '@/components/ui-componets/select-form/SelectForm'
import { FormPayment } from '../FormPayments'
import { CakesFullForm } from '../cakes-full-form'
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { useModal } from '@/contexts/modal'
import { Form } from '@/components/ui/form'
import { ProductOrder } from '../product-order'
import { useOrder } from '@/app/pedidos/useFormCorePedidos'
import { useContextOrders } from '@/contexts/dataContexts/ordersContext/useContextOrders'
import { toast } from 'react-toastify'
import { CreateCake } from '@/types/cake/create'
import { CreateProductOrder } from '@/types/order-product'

export const ModalPedidos = () => {
  const { openOrder, handleOpenOrder } = useModal()
  const { clients } = useContextClient()
  const { categorys } = useContextCategory()
  const { address } = useContextAddress()
  const { addOrder } = useContextOrders()

  const methods = useFormContext<FormDataPedidos>()

  const isDelivery = methods.watch('delivery')
  const typeFrete = methods.watch('logistic')
  const addess_id = methods.watch('address')

  const { executeCalculateTotal } = useOrder()

  executeCalculateTotal()

  console.log(methods.formState?.errors)
  const submit = async ({ orderProduct, ...data }: FormDataPedidos) => {
    console.log({ orderProduct, ...data })
    const products = orderProduct
      .reduce((acc, category) => {
        return [...acc, ...category]
      })
      .map((product) => {
        return {
          product_id: product.product_id,
          price: product.price,
          quantity: product.quantity,
          total: product.total,
        } as CreateProductOrder
      })

    const cakes: CreateCake[] = data.cakes.map((cake) => {
      const recheio: CreateCake['recheio'] = cake.recheios.map((recheio) => {
        return { id: recheio.id }
      })

      const topper: CreateCake['topper'] = {
        id: cake.topper?.id,
        tema: cake.topper?.tema,
        name: cake.topper?.name,
        idade: cake.topper?.idade,
        price: cake.topper?.price,
        description: cake.topper?.description,
        banner: cake.topper?.banner,
      }

      return {
        peso: cake.peso,
        formato: cake.formato,
        massa: cake.massa,
        recheio,
        price: cake.price,
        cobertura: cake.cobertura,
        description: cake.decoracao,
        banner: cake.banner,
        tem_topper: cake.tem_topper,
        topper,
      }
    })

    addOrder({
      client: { id: data.client.id },
      date: data.date,
      hour: data.hour,
      cor_forminhas: data.cor_forminhas,
      observations: data.observations,
      delivery: data.delivery,
      address: { id: addess_id, type_frete: data.logistic, value_frete: data.value_frete },
      total: data.total,
      status: data.status,
      cakes,
      products: products,
      payments: [],
    })
      .then(() => {
        toast.success('Pedido criado com sucesso!')
      })
      .catch((error) => {
        console.log(error.response.data.error)
        toast.error(error.response?.data?.error)
      })
  }

  return (
    <Dialog
      open={openOrder}
      onOpenChange={() => {
        methods.reset()
        handleOpenOrder()
      }}
    >
      <DialogTrigger asChild>
        <Button>
          Adicionar pedido
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-screen  max-w-6xl overflow-y-scroll rounded-2xl">
        <Form {...methods}>
          <form className="flex flex-col gap-5" onSubmit={methods.handleSubmit(submit)}>
            <InputForm control={methods.control} name="id" readOnly className="hidden" />

            <SelectSearch
              name="client.id"
              label="Cliente"
              control={methods.control}
              data={clients.map((client) => ({ label: client.name, value: client.id }))}
              onSelect={(value) => {
                methods.setValue('client.id', value)
              }}
            />

            <DatePickerForm control={methods.control} name="date" label="Data" />

            <InputForm control={methods.control} name="hour" label="Hora" type="time" />

            <CakesFullForm />

            {categorys?.map((category) => (
              <ProductOrder key={category.id} index={category.priority} category={category} />
            ))}

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
                  min={0}
                  label="Valor do frete/R$"
                  onChange={executeCalculateTotal}
                  showMessageError
                />
              </>
            )}

            <InputForm
              control={methods.control}
              name="total"
              type="number"
              typeof="numeric"
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

            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
