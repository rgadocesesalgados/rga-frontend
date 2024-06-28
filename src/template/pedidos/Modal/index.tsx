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
import { EditCake } from '@/types/cake'
import { ModalClient } from '@/app/pedidos/client/ModalClient'
import { useState } from 'react'
import { ModalAddress } from '@/app/pedidos/address/ModalAddress'
import { DocesPP } from '../product-order-peer-size'

export const ModalPedidos = ({ all = false }: { all?: boolean }) => {
  const { openOrder, handleOpenOrder } = useModal()
  const { clients } = useContextClient()
  const { categorys } = useContextCategory()
  const { address } = useContextAddress()
  const { addOrder, editOrder, getAllOrders } = useContextOrders()

  const methods = useFormContext<FormDataPedidos>()

  const isDelivery = methods.watch('delivery')
  const typeFrete = methods.watch('logistic')
  const addess_id = methods.watch('address')

  const { executeCalculateTotal } = useOrder()

  executeCalculateTotal()

  const submit = async ({ orderProduct, docesPP, ...data }: FormDataPedidos) => {
    const docesListPP = docesPP.map((product) => {
      return {
        product_id: product.product_id,
        price: product.price,
        quantity: product.quantity,
        total: product.total,
      }
    })
    const productsList = orderProduct
      .reduce((acc, category) => {
        return [...acc, ...category]
      }, [])
      .map((product) => {
        return {
          product_id: product.product_id,
          price: product.price,
          quantity: product.quantity,
          total: product.total,
        }
      })

    const payments = data.payment.map((pay) => {
      return { date: pay.date, paid: pay.paid, value: pay.value, type: pay.formPayment }
    })

    if (data.id) {
      const editCakes: EditCake[] = data.cakes.map((cake) => {
        const recheio: EditCake['recheio'] = cake.recheios.map((recheio) => {
          return { id: recheio.id }
        })

        const topper: EditCake['topper'] = {
          tema: cake.topper?.tema,
          name: cake.topper?.name,
          idade: cake.topper?.idade,
          price: cake.topper?.price,
          description: cake.topper?.description,
          banner: cake.topper?.banner,
          tem_topper: cake.tem_topper,
        }

        return {
          id: cake.id,
          peso: cake.peso,
          formato: cake.formato,
          massa: cake.massa,
          recheio,
          price: cake.price,
          cobertura: cake.cobertura,
          description: cake.decoracao,
          banner: cake.banner,
          topper,
          tem_topper: cake.tem_topper,
        }
      })

      editOrder({
        id: data.id,
        client_id: data.client.id,
        date: data.date,
        hour: data.hour,
        bolo: editCakes,
        orderProduct: [...productsList, ...docesListPP],
        cor_forminhas: data.cor_forminhas,
        observations: data.observations,
        delivery: data.delivery,
        address: { address_id: data.address, type_frete: data.logistic, value_frete: data.value_frete },
        total: data.total,
        payment: payments,
        status: data.status,
      })
        .then(() => {
          getAllOrders(all)
          handleOpenOrder()
          toast.success('Pedido editado com sucesso!')
        })
        .catch((error) => {
          console.log(error.response.data.error)
          toast.error(error.response?.data?.error)
        })
    } else {
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
        products: [...productsList, ...docesListPP],
        payments,
      })
        .then(() => {
          getAllOrders(all)
          handleOpenOrder()
          toast.success('Pedido criado com sucesso!')
        })
        .catch((error) => {
          console.log(error.response.data.error)
          toast.error(error.response?.data?.error)
        })
    }
  }

  const [openModalClient, setOpenModalClient] = useState(false)
  const [openModalAddress, setOpenModalAddress] = useState(false)

  return (
    <Dialog
      open={openOrder}
      onOpenChange={() => {
        methods.reset({
          id: '',
          client: { id: '' },
          date: new Date(),
          hour: '00:00',
          cakes: [],
          orderProduct: [],
          cor_forminhas: '',
          observations: '',
          delivery: false,
          address: '',
          logistic: 'FRETE_MOTO',
          value_frete: 0,
          total: 0,
          payment: [],
          status: 'RASCUNHO',
        })
        handleOpenOrder()
      }}
    >
      <DialogTrigger asChild>
        <Button>
          Adicionar pedido
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="my-5 h-full max-w-6xl overflow-y-scroll rounded-2xl pb-10">
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
              commandEmpty={
                <ModalClient
                  onOpenClient={openModalClient}
                  handleOpenClient={() => setOpenModalClient(!openModalClient)}
                />
              }
            />

            <DatePickerForm control={methods.control} name="date" label="Data" />

            <InputForm control={methods.control} name="hour" label="Hora" type="time" />

            <CakesFullForm />

            <DocesPP />

            {categorys
              .filter((category) => category.priority >= 0)
              .map((category) => (
                <ProductOrder key={category.id} index={category.priority} category={category} />
              ))}

            <InputForm
              control={methods.control}
              name="cor_forminhas"
              label="Cor das forminhas"
              placeholder="Se tiver doces, adicione a cor da forminha aqui"
              showMessageError
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
                  commandEmpty={
                    <ModalAddress
                      openAddress={openModalAddress}
                      handleOpenAddress={() => setOpenModalAddress(!openModalAddress)}
                    />
                  }
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
              <Button type="submit" disabled={openModalClient || openModalAddress}>
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
