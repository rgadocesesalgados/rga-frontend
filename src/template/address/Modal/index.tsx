import { FormDataAddress } from '@/app/enderecos/types'
import { Button } from '@/components/comum/Button'
import Form from '@/components/comum/Form'
import Input from '@/components/comum/Input'
import Modal from '@/components/comum/Modal'
import { MFooter } from '@/components/comum/Modal/components/MFooter'
import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}
export const ModalAddress = ({ isOpen, closeModal }: ModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useFormContext<FormDataAddress>()

  const { addAddress, editAddress, getAllAddresses } = useContextAddress()

  const submit = async ({
    id,
    rua,
    numero,
    bairro,
    ponto_de_referencia,
    cidade,
    frete_moto,
    frete_carro,
  }: FormDataAddress) => {
    if (id) {
      editAddress({ id, rua, numero, bairro, ponto_de_referencia, cidade, frete_moto, frete_carro })
        .then(() => {
          closeModal()
          toast.success(`${rua} editado com sucesso!`)
          getAllAddresses()
          reset()
        })
        .catch((error) => toast.error(error.response.data?.message))
    } else {
      addAddress({ rua, numero, bairro, ponto_de_referencia, cidade, frete_moto, frete_carro })
        .then(() => {
          closeModal()
          toast.success(`${rua} adicionado com sucesso!`)
          getAllAddresses()
        })
        .catch((error) => toast.error(error.response.data?.message))
    }
  }

  const closeModalAddress = () => {
    reset()
    closeModal()
  }
  return (
    <Modal isOpen={isOpen} closeModal={closeModalAddress} title="Endereço">
      <Form onSubmit={handleSubmit(submit)}>
        <Input {...register('id')} hidden readOnly />

        <Input placeholder="Rua" {...register('rua')} error={errors.rua?.message} label="Rua" />

        <Input
          typeof="numeric"
          type="number"
          placeholder="Numero"
          {...register('numero')}
          error={errors.numero?.message}
          label="Número"
        />

        <Input placeholder="Bairro" {...register('bairro')} error={errors.bairro?.message} label="Bairro" />

        <Input
          placeholder="Ponto de Referência"
          {...register('ponto_de_referencia')}
          error={errors.ponto_de_referencia?.message}
          label="Ponto de Referência"
        />

        <Input placeholder="Cidade" {...register('cidade')} error={errors.cidade?.message} label="Cidade" />

        <Input
          type="number"
          typeof="numeric"
          label="Frete moto R$"
          {...register('frete_moto')}
          error={errors.frete_moto?.message}
          min={0}
        />

        <Input
          type="number"
          typeof="numeric"
          label="Frete carro R$"
          {...register('frete_carro')}
          error={errors.frete_carro?.message}
          min={0}
        />

        <MFooter>
          <Button color="red" onClick={closeModalAddress}>
            Cancelar
          </Button>
          <Button type="submit">Cadastrar</Button>
        </MFooter>
      </Form>
    </Modal>
  )
}
