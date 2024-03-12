import { FormDataProdutos } from '@/app/produtos/types'
import { Button } from '@/components/comum/Button'
import Form from '@/components/comum/Form'
import Input from '@/components/comum/Input'
import { InputSelect } from '@/components/comum/InputSelect'
import { OptionProps } from '@/components/comum/InputSelect/types'
import Modal from '@/components/comum/Modal'
import { MFooter } from '@/components/comum/Modal/components/MFooter'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { ModalTemplateProps } from '@/template/types'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
export const ModalProdutos = ({ isOpen, closeModal }: ModalTemplateProps) => {
  const { categorys } = useContextCategory()
  const { getAllProducts, addProduct, editProduct } = useContextProduct()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useFormContext<FormDataProdutos>()

  const submit = async ({ id, category_name, name, banner_url, min_quantity, price }: FormDataProdutos) => {
    if (id) {
      editProduct({ id, name, category_name, banner: banner_url, min_quantity, price })
        .then(() => {
          closeModalProdutos()
          reset()
          toast.success(`${name} editado com sucesso!`)
        })
        .catch((error) => toast.error(error.response.data?.message))
    } else {
      addProduct({ name, category_name, banner: banner_url, min_quantity, price })
        .then(() => {
          closeModalProdutos()
          toast.success(`${name} adicionado com sucesso!`)
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.response.data?.message)
        })
    }
  }
  const closeModalProdutos = async () => {
    getAllProducts()
    closeModal()
    reset()
  }
  return (
    <Modal isOpen={isOpen} closeModal={closeModalProdutos} title="Produto">
      <Form onSubmit={handleSubmit(submit)}>
        <Input type="text" {...register('id')} error={errors.name?.message} hidden />

        <Input type="text" label="Nome" placeholder="Nome" {...register('name')} error={errors.name?.message} />

        <InputSelect
          label="Bucar por categoria"
          data={categorys?.map(({ name }) => ({ value: name, label: name }) as OptionProps)}
          inputid="category_name"
          inputSearch="inputSearch"
        />

        <Input type="text" label="Preço" placeholder="R$ 00,00" {...register('price')} error={errors.price?.message} />

        <Input
          {...register('min_quantity')}
          type="number"
          label="Quantidade minima"
          placeholder="00"
          error={errors.min_quantity?.message}
        />

        <Input
          type="url"
          label="Banner"
          placeholder="https://"
          {...register('banner_url')}
          error={errors.banner_url?.message}
        />

        <MFooter>
          <Button color="red" onClick={closeModalProdutos}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </MFooter>
      </Form>
    </Modal>
  )
}
