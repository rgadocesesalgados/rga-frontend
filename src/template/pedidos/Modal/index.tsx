import { FormDataPedidos } from '@/app/pedidos/types'

import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Loader2, PlusCircle } from 'lucide-react'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { DatePickerForm } from '@/components/ui-componets/date-picker'
import { TextareaForm } from '@/components/ui-componets/textarea-form'
import { CheckboxForm } from '@/components/ui-componets/checkbox-form/CheckboxForm'
import { SelectForm } from '@/components/ui-componets/select-form/SelectForm'
import { FormPayment } from '../FormPayments'
import { CakesFullForm } from '../cakes-full-form'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { ProductOrder } from '../product-order'
import { useOrder } from '@/app/pedidos/useFormCorePedidos'
import { useContextOrders } from '@/contexts/dataContexts/ordersContext/useContextOrders'
import { toast } from 'react-toastify'
import { CreateCake } from '@/types/cake/create'
import { EditCake } from '@/types/cake'
import { ModalClient } from '@/app/pedidos/client/ModalClient'
import { useEffect, useState } from 'react'
import { ModalAddress } from '@/app/pedidos/address/ModalAddress'
import { maskTel } from '@/app/utils/masks/maskTel'
import { api } from '@/services/api/apiClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ClientProps } from '@/app/clientes/types'
import { debounce } from 'lodash'
import { useQueryState } from 'nuqs'
import { AddressProps } from '@/app/enderecos/types'
import { AxiosError } from 'axios'
import { Boxes } from '../boxes'
import { useOrderStates } from '../Table/useOrderStatus'
import { getOrder, OrdersResponse } from '@/services/orders'
import { queryClient } from '@/app/layout'

const fetchDebounce = debounce((func: () => void) => func(), 500)

export const ModalPedidos = () => {
  const [addressComplete, setAddressComplete] = useQueryState('address_complete')

  const { getAllCategorys } = useContextCategory()
  const { data: categorys } = useQuery({ initialData: [], queryKey: ['categorys'], queryFn: getAllCategorys })

  const { addOrder, editOrder } = useContextOrders()

  const methods = useFormContext<FormDataPedidos>()

  const isDelivery = methods.watch('delivery')
  const typeFrete = methods.watch('logistic')
  const addess_id = methods.watch('address')
  const [client, setClient] = useState('a')
  const [address, setAddress] = useState(addressComplete || 'rua')
  const [freteCarro, setFreteCarro] = useQueryState('frete_carro')
  const [freteMoto, setFreteMoto] = useQueryState('frete_moto')

  const { executeCalculateTotal } = useOrder()
  useEffect(() => {
    executeCalculateTotal()
  })

  const submit = async ({ orderProduct, boxes, ...data }: FormDataPedidos) => {
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

    const boxList = boxes.reduce((acc, box) => {
      return [...acc, ...box.map(({ products }) => ({ products }))]
    }, [])

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
          recebido: cake.topper?.recebido,
          fornecedor: cake.topper?.fornecedor,
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

      return await editOrder({
        id: data.id,
        client_id: data.client.id,
        date: data.date,
        hour: data.hour,
        bolo: editCakes,
        orderProduct: productsList,
        cor_forminhas: data.cor_forminhas,
        observations: data.observations,
        delivery: data.delivery,
        address: { address_id: data.address, type_frete: data.logistic, value_frete: data.value_frete },
        total: data.total,
        payment: payments,
        status: data.status,
        boxes: boxList,
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
          recebido: cake.topper?.recebido,
          fornecedor: cake.topper?.fornecedor,
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
      return await addOrder({
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
        products: productsList,
        payments,
        boxes: boxList,
      })
    }
  }

  const [openModalClient, setOpenModalClient] = useState(false)
  const [openModalAddress, setOpenModalAddress] = useState(false)
  const [enebleSearch, setEnableSearch] = useState(false)

  const {
    data: dataFetch,
    refetch,
    isLoading,
  } = useQuery<ClientProps[]>({
    queryKey: ['search-clients', client],
    queryFn: async () => {
      const response = await api.get(`/search-client/${client}`)
      console.log(response.data)
      return response.data
    },
    enabled: enebleSearch && client.length > 2,
  })

  const {
    data: dataFetchAddress,
    refetch: refetchAddress,
    isLoading: isLoadingAddress,
  } = useQuery<AddressProps[]>({
    queryKey: ['search-address', address],
    queryFn: async () => {
      const response = await api.get(`/search-address/${address}`)
      console.log(response.data)
      return response.data
    },
    enabled: enebleSearch && client.length > 2,
  })

  useEffect(() => {
    fetchDebounce(() => {
      setEnableSearch(true)
      refetch().finally(() => setEnableSearch(false))
      console.log('debounce')
    })
  }, [client])

  useEffect(() => {
    fetchDebounce(() => {
      setEnableSearch(true)
      refetchAddress().finally(() => setEnableSearch(false))
      console.log('debounce:address')
    })
  }, [address])

  const { isPending, mutate } = useMutation({
    mutationFn: submit,
    onSuccess: (data) => {
      const orders = queryClient.getQueryData(['orders', page, take, query]) as OrdersResponse[]

      const order = orders.find(({ id }) => orderId === id)

      if (!order) {
        queryClient.setQueryData(['orders', page, take, query], [data, ...orders])
      }

      queryClient.setQueryData(['orders', page, take, query], [data, ...orders.filter(({ id }) => id !== orderId)])

      queryClient.invalidateQueries({ queryKey: ['orders', orderId] })
      setOrderStates({ orderId: '', openOrderModal: false })
      toast.success('Salvo com sucesso!')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error)
        console.log('erro: ' + error.response.data)
        return
      }
      console.log(error)
      toast.error('Erro no servidor!')
    },
  })

  const { openOrderModal, orderId, setOrderStates, page, query, take } = useOrderStates()

  const { isLoading: isOrderLoading, data } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: async () => {
      return await getOrder(orderId)
    },
    enabled: !!orderId,
  })

  useEffect(() => {
    if (!data) return

    const order: FormDataPedidos = {
      ...data,

      client: { id: data.client.id },

      cakes: data.cakes.map((cake) => ({
        ...cake,
        recheios: cake.recheios.map(({ name, ...recheioRest }) => recheioRest),
        topper: cake.topper
          ? {
              ...cake.topper,
            }
          : undefined,
      })),

      orderProduct: data.orderProduct.map((productArray) => productArray.map(({ product, ...itemRest }) => itemRest)),

      boxes: data.boxes.map((boxArray) =>
        boxArray.map((box) => {
          const sizeNumber = typeof box.size === 'string' ? parseInt(box.size, 10) : box.size
          return {
            size: `${sizeNumber}` as unknown as number,
            products: box.products.map(({ id, name, ...productRest }) => productRest),
          }
        }),
      ),

      payment: data.payment.map(({ id, ...paymentRest }) => ({
        ...paymentRest,
        date:
          paymentRest.date instanceof Date
            ? paymentRest.date
            : paymentRest.date
              ? new Date(paymentRest.date)
              : undefined,
      })),
      address: data.address_id,
    }
    methods.reset(order)
  }, [data, methods.reset])

  return (
    <Dialog
      open={openOrderModal}
      onOpenChange={(val) => {
        setFreteCarro('')
        setFreteMoto('')

        setAddressComplete('')

        setOrderStates({ openOrderModal: val, orderId: '' })
        if (val) {
          alert('verdade')
        }
      }}
    >
      <Button
        onClick={() => {
          setOrderStates({ openOrderModal: true, orderId: '' })

          setOrderStates({ orderId: '' })
          methods.reset({
            id: '',
            client: { id: '' },
            date: new Date(),
            hour: '00:00',
            cakes: [],
            boxes: [],
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
        }}
      >
        Adicionar pedido
        <PlusCircle className="ml-2 h-4 w-4" />
      </Button>

      <DialogContent className="my-5 h-full max-w-6xl overflow-y-scroll rounded-2xl pb-10">
        {!isOrderLoading && (
          <Form {...methods}>
            <form className="flex flex-col gap-5" onSubmit={methods.handleSubmit((data) => mutate(data))}>
              <InputForm control={methods.control} name="id" readOnly className="hidden" />

              <SelectSearch
                name="client.id"
                label="Cliente"
                control={methods.control}
                data={dataFetch?.map((client) => ({
                  label: client.name,
                  value: client.id,
                  complement: maskTel(client.tel),
                }))}
                onSelect={(value) => {
                  methods.setValue('client.id', value)
                }}
                commandEmpty={
                  <ModalClient
                    onOpenClient={openModalClient}
                    handleOpenClient={() => setOpenModalClient(!openModalClient)}
                  />
                }
                isLoading={isLoading}
                shouldFilter={false}
                onValueChange={(val) => setClient(val)}
                displayValue={data?.client.name}
              />

              <DatePickerForm control={methods.control} name="date" label="Data" />

              <InputForm control={methods.control} name="hour" label="Hora" type="time" />

              <CakesFullForm />

              {categorys
                .filter((category) => !!category.boxes.length)
                .map((category, i) => (
                  <Boxes key={category.id} index={i} category={category} />
                ))}

              {categorys
                .filter((category) => !category.boxes.length)
                .map((category, i) => (
                  <ProductOrder key={category.id} index={i} category={category} />
                ))}

              <InputForm
                control={methods.control}
                name="cor_forminhas"
                label="Cor das forminhas"
                placeholder="Se tiver doces, adicione a cor da forminha aqui"
                showMessageError
              />

              <TextareaForm
                control={methods.control}
                name="observations"
                placeholder="Observações"
                label="Observações"
              />

              <CheckboxForm
                control={methods.control}
                name="delivery"
                label="Entrega"
                description="Se for entrega marque essa caixinha"
                onChange={(e) => {
                  if (!e.target.value) {
                    methods.setValue('value_frete', 0)
                    methods.setValue('logistic', 'FRETE_MOTO')
                    methods.setValue('address', '')
                    setAddressComplete('')
                    setFreteCarro('')
                    setFreteMoto('')
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
                    data={dataFetchAddress?.map((addressItem) => ({
                      label: addressItem.address_complete,
                      value: addressItem.id,
                    }))}
                    onSelect={(value) => {
                      const addressSelect = dataFetchAddress.find((address) => address.id === value)
                      console.log(addressSelect)

                      methods.setValue('address', value)
                      methods.setValue('value_frete', addressSelect[typeFrete?.toLowerCase()])
                      setFreteCarro(`${addressSelect?.frete_carro}`)
                      setFreteMoto(`${addressSelect?.frete_moto}`)
                      setAddressComplete(addressSelect?.address_complete)
                    }}
                    commandEmpty={
                      <ModalAddress
                        openAddress={openModalAddress}
                        handleOpenAddress={() => setOpenModalAddress(!openModalAddress)}
                      />
                    }
                    shouldFilter={false}
                    onValueChange={(val) => setAddress(val)}
                    displayValue={data?.address}
                    isLoading={isLoadingAddress}
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

                      const paramsFrete = {
                        FRETE_CARRO: +freteCarro,
                        FRETE_MOTO: +freteMoto,
                      }

                      methods.setValue('value_frete', paramsFrete[value] || 0)
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
                  { label: 'Orçamento', value: 'ORCAMENTO' },
                ]}
                label="Status"
                showMessageError
              />

              <FormPayment />

              <DialogFooter>
                <Button type="submit" disabled={openModalClient || openModalAddress || isPending}>
                  Salvar {isPending && <Loader2 className="animate-spin" />}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {isOrderLoading && <Loader2 className="animate-spin" />}
      </DialogContent>
    </Dialog>
  )
}
