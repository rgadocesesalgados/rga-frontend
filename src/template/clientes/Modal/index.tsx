import { FormDataCliente } from '@/app/clientes/types'
import { Button } from '@/components/comum/Button'
import Form from '@/components/comum/Form'
import Input from '@/components/comum/Input'
import { InputSelect } from '@/components/comum/InputSelect'
import { OptionProps } from '@/components/comum/InputSelect/types'
import Modal from '@/components/comum/Modal'
import { MFooter } from '@/components/comum/Modal/components/MFooter'
import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { useContextClient } from '@/contexts/dataContexts/clientesContext/useContextClient'
import { ModalTemplateProps } from '@/template/types'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

export const ModalClient = ({ isOpen, closeModal }: ModalTemplateProps) => {
  const { address } = useContextAddress()
  const { editClient, addClient, getAllClients } = useContextClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext<FormDataCliente>()

  const submit = async ({ id, name, tel, address_id }: FormDataCliente) => {
    if (id) {
      editClient({ id, name, tel, address_id })
        .then(() => {
          closeModal()
          reset()
          getAllClients()
          toast.success(`${name} editado com sucesso!`)
        })
        .catch((error) => {
          toast.error(error.response.data?.error)
          console.log(error)
        })
    } else {
      console.log({ name, tel, address_id })
      addClient({ name, tel, address_id })
        .then(() => {
          closeModal()
          reset()
          getAllClients()
          toast.success(`${name} adicionado com sucesso!`)
        })
        .catch((error) => {
          toast.error(error.response.data?.error)

          console.log(error)
        })
    }
  }

  const closeModalClient = () => {
    closeModal()
    reset()
  }
  return (
    <Modal isOpen={isOpen} closeModal={closeModalClient} title="Cliente">
      <Form onSubmit={handleSubmit(submit)}>
        <Input type="text" {...register('id')} error={errors.name?.message} hidden />

        <Input type="text" label="Nome" placeholder="Nome" {...register('name')} error={errors.name?.message} />

        <Input type="text" label="Telefone" placeholder="Telefone" {...register('tel')} error={errors.tel?.message} />

        <InputSelect
          label="Bucar endereço"
          data={address?.map(({ id, address_complete }) => ({ value: id, label: address_complete }) as OptionProps)}
          inputid="address_id"
          inputSearch="inputSearch"
        />

        <MFooter>
          <Button type="button" color="red" onClick={closeModalClient}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </MFooter>
      </Form>
    </Modal>
  )
}
