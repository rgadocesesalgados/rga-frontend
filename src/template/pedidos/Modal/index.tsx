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
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { ModalTemplateProps } from '@/template/types'
import { useFormContext } from 'react-hook-form'

export const ModalPedidos = ({ isOpen, closeModal }: ModalTemplateProps) => {
  const { clients } = useContextClient()
  const { categorys } = useContextCategory()
  const { products } = useContextProduct()
  const { address } = useContextAddress()

  const closeModalPedidos = () => {
    closeModal()
  }

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
    getValues,
  } = useFormContext<FormDataPedidos>()

  const delivery = watch('delivery')
  const orderProduct = watch('orderProduct')
  const logistic = watch('logistic')

  const submit = async (data: FormDataPedidos) => {
    console.log(data)
  }

  const calculateTotal = () => {
    const orderProductPricesSum = orderProduct?.reduce((acc, item, index) => acc + +item[index]?.price, 0) || 0

    const valueDelivery = address?.find((address) => address.id === getValues('address'))[logistic] || 0
    console.log(valueDelivery)

    setValue('total', orderProductPricesSum + valueDelivery)
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
            />

            <Select {...register('logistic')} label="Logística" data={['frete_carro', 'frete_moto']} />
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
          data={['RASCUNHO', 'ANOTADO', 'EM PRODUCAO', 'ENTREGUE', 'CANCELADO']}
          error={errors?.status?.message}
        />

        <MFooter>
          <Button type="submit">Salvar</Button>
        </MFooter>
      </Form>
    </Modal>
  )
}
