import { Button } from '@/components/comum/Button'
import Form from '@/components/comum/Form'
import Input from '@/components/comum/Input'
import Modal from '@/components/comum/Modal'
import { MFooter } from '@/components/comum/Modal/components/MFooter'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FormDataCategorias } from '../types'

interface ModalCategoryProps {
  isOpen: boolean
  closeModal: () => void
}

export const ModalCategory = ({ isOpen, closeModal }: ModalCategoryProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useFormContext<FormDataCategorias>()

  const { addCategory, editCategory, getAllCategorys } = useContextCategory()
  const closeModalCategory = () => {
    closeModal()
    reset()
  }

  const submit = async ({ name, id }: FormDataCategorias) => {
    if (id) {
      await editCategory({ name, id })
        .then(() => {
          toast.success(`${name} editado com sucesso!`)
          closeModalCategory()
        })
        .catch((error) => {
          toast.error(error.response?.data?.error)
        })
    } else {
      await addCategory(name)
        .then(() => {
          closeModalCategory()
          toast.success(`${name} criado com sucesso!`)
        })
        .catch((error) => {
          toast.error(error.response?.data?.error)
        })
    }
    getAllCategorys()
  }
  return (
    <Modal isOpen={isOpen} closeModal={closeModalCategory} title="Categoria">
      <Form onSubmit={handleSubmit(submit)}>
        <Input placeholder="ID da categoria" {...register('id')} error={errors?.id?.message} disabled hidden readOnly />
        <Input placeholder="Nome da categoria" label="Nome" {...register('name')} error={errors?.name?.message} />

        <MFooter>
          <Button color="red" onClick={closeModalCategory}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </MFooter>
      </Form>
    </Modal>
  )
}
