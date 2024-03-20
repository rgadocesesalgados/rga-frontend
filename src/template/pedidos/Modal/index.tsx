import { FormDataPedidos } from '@/app/pedidos/types'
import { Button } from '@/components/comum/Button'
import Form from '@/components/comum/Form'
import Input from '@/components/comum/Input'
import { InputSelect } from '@/components/comum/InputSelect'
import { OptionProps } from '@/components/comum/InputSelect/types'
import Modal from '@/components/comum/Modal'
import { MFooter } from '@/components/comum/Modal/components/MFooter'
import { Select } from '@/components/comum/Select'
import { OrderItem } from '@/components/pedidos/OrderItem'
import { Payment } from '@/components/pedidos/Payment'
import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextClient } from '@/contexts/dataContexts/clientesContext/useContextClient'
import { useContextPedidos } from '@/contexts/dataContexts/ordersContext/useContextPedidos'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { ModalTemplateProps } from '@/template/types'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

export const ModalPedidos = ({ isOpen, closeModal }: ModalTemplateProps) => {
  const { clients } = useContextClient()
  const { categorys } = useContextCategory()
  const { products } = useContextProduct()
  const { address } = useContextAddress()
  const { addOrder, getAllOrders } = useContextPedidos()

  const closeModalPedidos = () => {
    reset()
    closeModal()
  }

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useFormContext<FormDataPedidos>()

  const delivery = watch('delivery')
  const orderProduct = watch('orderProduct')
  const logistic = watch('logistic')

  const calculateTotal = () => {
    const orderProductPricesSum = orderProduct?.reduce((sum, item) => {
      if (item.length > 0) {
        const price = item.reduce((sum2, item) => sum2 + +item.price, 0)

        console.log({ sum2: price })
        return sum + price
      }

      return sum
    }, 0)

    const addressSeted = address?.find((address) => address.id === getValues('address'))
    const valueByTypeDelivery = (addressSeted && addressSeted[logistic]) || 0
    const valueDelivery = delivery ? valueByTypeDelivery : 0

    setValue('total', orderProductPricesSum + valueDelivery)
  }

  console.log(errors)

  const submit = async ({
    client,
    data,
    orderProduct,
    cor_forminhas,
    observations,
    delivery,
    address,
    logistic,
    value_frete,
    total,
    status,
  }: FormDataPedidos) => {
    const products = orderProduct?.reduce((sum, item) => {
      item.length > 0 && sum.push(...item)

      return sum
    }, [])

    console.log(products)

    const existingProducts = products[0].product_id
      ? products.map(({ price, product_id, quantity }) => ({ price, product_id, quantity }))
      : []

    addOrder({
      client_id: client,
      data,
      products: existingProducts,
      cor_da_forminha: cor_forminhas,
      observations,
      delivery,
      address_id: address,
      frete: logistic,
      value_frete,
      total,
      status,
    })
      .then(() => {
        getAllOrders()
        closeModalPedidos()
        toast.success('Pedido criado com sucesso!')
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response?.data?.error)
      })
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModalPedidos} title="Pedido">
      <Form onSubmit={handleSubmit(submit)}>
        <InputSelect
          data={clients?.map(({ id, name }) => ({ label: name, value: id }) as OptionProps)}
          error={errors?.client?.message}
          inputSearch="searchClient"
          inputid="client"
          label="Cliente"
          placeholder="Selecione o cliente"
        />

        <Input {...register('data')} label="Data/Hora" type="datetime-local" error={errors?.data?.message} />

        {categorys?.map(({ id, name }, index) => <OrderItem key={id} category={name} index={index} data={products} />)}

        <Select
          label="Cor da forminha"
          data={['não tem', 'branca', 'vermelho', 'amarelo', 'azul', 'cinza']}
          error={errors?.cor_forminhas?.message}
          {...register('cor_forminhas')}
        />

        <Input
          {...register('observations')}
          label="Observações"
          type="text"
          error={errors?.observations?.message}
          required={false}
        />

        <Input {...register('delivery')} label="Entrega" type="checkbox" />

        {delivery && (
          <>
            <InputSelect
              inputSearch="searchAddress"
              inputid="address"
              label="Endereço"
              data={address?.map(({ id, address_complete }) => ({ label: address_complete, value: id }))}
              error={errors?.searchAddress?.message}
            />

            <Select {...register('logistic')} label="Logística" data={['FRETE_CARRO', 'FRETE_MOTO']} />

            <Input
              {...register('value_frete')}
              label="Valor Frete"
              type="number"
              min={0.0}
              step={0.01}
              error={errors?.value_frete?.message}
              required={false}
            />
          </>
        )}

        <Input
          {...register('total')}
          label="Total"
          type="number"
          min={0.0}
          step={0.01}
          error={errors?.total?.message}
          required={false}
          onFocus={calculateTotal}
        />

        <Payment />

        <Select
          {...register('status')}
          label="Status"
          data={['RASCUNHO', 'ANOTADO', 'EM_PRODUCAO', 'ENTREGUE', 'CANCELADO']}
          error={errors?.status?.message}
        />

        <MFooter>
          <Button type="submit">Salvar</Button>
        </MFooter>
      </Form>
    </Modal>
  )
}
