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

  const submit = async ({ id, name, min_quantity, price, category_id, banner_url }: FormDataProdutos) => {
    if (id) {
      editProduct({ id, name, price, category_id, min_quantity, banner: banner_url })
        .then(() => {
          closeModalProdutos()
          reset()
          toast.success(`${name} editado com sucesso!`)
        })
        .catch((error) => toast.error(error.response.data?.error))
    } else {
      addProduct({ name, min_quantity, price, category_id, banner: banner_url })
        .then(() => {
          closeModalProdutos()
          toast.success(`${name} adicionado com sucesso!`)
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.response.data?.error)
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
        <Input {...register('id')} type="text" error={errors.name?.message} hidden />

        <Input {...register('name')} type="text" label="Nome" placeholder="Nome" error={errors.name?.message} />

        <InputSelect
          label="Bucar por categoria"
          data={categorys?.map(({ name, id }) => ({ value: id, label: name }) as OptionProps)}
          inputid="category_id"
          inputSearch="categorySearch"
        />

        <Input
          {...register('price')}
          type="number"
          label="Preço"
          placeholder="R$ 00,00"
          step={0.01}
          error={errors.price?.message}
        />

        <Input
          {...register('min_quantity')}
          type="number"
          label="Quantidade minima"
          placeholder="00"
          error={errors.min_quantity?.message}
        />

        <Input
          {...register('banner_url')}
          type="url"
          label="Banner"
          placeholder="https://"
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
