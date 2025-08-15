'use client'

import { ClientProps } from '@/app/clientes/types'
import { AddressProps } from '@/app/enderecos/types'
import { queryClient } from '@/app/layout'
import { ModalAddress } from '@/app/pedidos/address/ModalAddress'
import { ModalClient } from '@/app/pedidos/client/ModalClient'
import { FormDataPedidos } from '@/app/pedidos/types'
import { useOrder } from '@/app/pedidos/useFormCorePedidos'
import { maskTel } from '@/app/utils/masks/maskTel'
import { CheckboxForm } from '@/components/ui-componets/checkbox-form/CheckboxForm'
import { DatePickerForm } from '@/components/ui-componets/date-picker'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectForm } from '@/components/ui-componets/select-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { TextareaForm } from '@/components/ui-componets/textarea-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextOrders } from '@/contexts/dataContexts/ordersContext/useContextOrders'
import { api } from '@/services/api/apiClient'
import { CakesFullForm } from '@/template/pedidos/cakes-full-form'
import { FormPayment } from '@/template/pedidos/FormPayments'
import { ProductOrder } from '@/template/pedidos/product-order'
import { DocesPP } from '@/template/pedidos/product-order-peer-size'
import { EditCake } from '@/types/cake'
import { GetOrder } from '@/types/order'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { debounce } from 'lodash'
import { Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function Edit() {
  return <ModalPedidos />
}

const fetchDebounce = debounce((func: () => void) => func(), 500)

const ModalPedidos = () => {
  const { back } = useRouter()
  const [clientName, setClientName] = useQueryState('client')
  const [addressComplete, setAddressComplete] = useQueryState('address_complete')

  const { categorys } = useContextCategory()

  const { editOrder, getAllOrders } = useContextOrders()

  const methods = useFormContext<FormDataPedidos>()

  const isDelivery = methods.watch('delivery')
  const typeFrete = methods.watch('logistic')
  const [client, setClient] = useState('a')
  const [address, setAddress] = useState(addressComplete || 'rua')
  const [freteCarro, setFreteCarro] = useQueryState('frete_carro')
  const [freteMoto, setFreteMoto] = useQueryState('frete_moto')

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

      await editOrder({
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
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['orders', id] })
      back()
      await getAllOrders()

      toast.success('Salvo com sucesso!')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error)
      }
      toast.error('Erro no servidor!')
      console.log(error)
    },
  })

  const { id } = useParams<{ id: string }>()

  const { data, isLoading: isLoadingOrder } = useQuery<GetOrder>({
    queryKey: ['orders', id],
    queryFn: async () => {
      const response = await api.get(`/orders/${id}`)

      return response.data
    },
  })

  useEffect(() => {
    if (data) {
      const { address, orderProduct, date, bolo, payment, docesPP, ...rest } = data

      const order: FormDataPedidos = {
        address: address?.id,
        value_frete: address?.value_frete,
        logistic: address?.type_frete,
        cakes: bolo?.map((cake) => ({
          id: cake.id,
          peso: cake.peso,
          formato: cake.formato,
          massa: cake.massa,
          recheios: cake.recheio,
          price: cake.price,
          cobertura: cake.cobertura,
          decoracao: cake.description ?? '',
          banner: cake.banner,
          tem_topper: cake.topper ? true : false,
          topper: {
            tema: cake.topper?.tema ?? '',
            name: cake.topper?.name ?? '',
            idade: cake.topper?.idade,
            price: cake.topper?.price ?? 15,
            description: cake.topper?.description ?? '',
            banner: cake.topper?.banner ?? '',
            fornecedor: cake.topper?.fornecedor,
          },
        })),
        orderProduct: orderProduct.reduce(
          (acc, item) => {
            if (item.category.priority < 0) {
              return acc
            }
            if (typeof acc[item.category.priority] === 'undefined') {
              acc[item.category.priority] = [item]

              return acc
            }

            acc[item.category.priority].push(item)

            return acc
          },
          [] as FormDataPedidos['orderProduct'],
        ),
        docesPP,
        date: new Date(date),
        payment: payment.map((pay) => {
          return {
            date: pay.date ? new Date(pay.date) : new Date(),
            paid: pay.paid,
            value: pay.value,
            formPayment: pay.type,
          }
        }),
        ...rest,
      }
      setClientName(data.client.name)
      if (address) {
        setFreteCarro(`${address.frete_carro}`)
        setFreteMoto(`${address.frete_moto}`)
        setAddressComplete(address.address_complete)
      }

      methods.reset(order)
    }
  }, [data])

  return (
    <Card>
      <CardContent className="my-5 h-full max-w-6xl rounded-2xl">
        {isLoadingOrder && <Loader2 className="animate-spin" />}
        {!isLoadingOrder && (
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
                  const client = dataFetch.find((client) => client.id === value)
                  methods.setValue('client.id', value)
                  setClientName(client.name)
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
                displayValue={clientName}
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
                    displayValue={addressComplete}
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

              <CardFooter className="space-x-2">
                <Button type="button" variant="outline" onClick={() => back()}>
                  Voltar {isPending && <Loader2 className="animate-spin" />}
                </Button>
                <Button type="submit" disabled={openModalClient || openModalAddress || isPending}>
                  Salvar {isPending && <Loader2 className="animate-spin" />}
                </Button>
              </CardFooter>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
