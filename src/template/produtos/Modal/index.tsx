import { FormDataProdutos } from '@/app/produtos/types'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectForm } from '@/components/ui-componets/select-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { useModal } from '@/contexts/modal'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { PlusCircle } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
export const ModalProdutos = () => {
  const { openProduct, handleOpenProduct } = useModal()
  const { categorys } = useContextCategory()
  const { getAllProducts, addProduct, editProduct } = useContextProduct()

  const methods = useFormContext<FormDataProdutos>()

  const imageCake = methods.watch('banner_url')

  const imageValid = imageCake?.includes('https://') || imageCake?.includes('http://') ? imageCake : ''

  const submit = async ({ id, name, min_quantity, price, category_id, banner_url, size }: FormDataProdutos) => {
    if (id) {
      editProduct({ id, name, price, category_id, min_quantity, banner: banner_url, size })
        .then(() => {
          getAllProducts()
          handleOpenProduct()
          methods.reset({})
          toast.success(`${name} editado com sucesso!`)
        })
        .catch((error) => toast.error(error.response.data?.error))
    } else {
      addProduct({ name, min_quantity, price, category_id, banner: banner_url, size })
        .then(() => {
          getAllProducts()
          handleOpenProduct()
          toast.success(`${name} adicionado com sucesso!`)
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.response?.data?.error)
        })
    }
  }

  return (
    <Dialog
      open={openProduct}
      onOpenChange={() => {
        handleOpenProduct()
        methods.reset({})
      }}
    >
      <DialogTrigger asChild>
        <Button type="submit">
          Adicionar produto <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-screen overflow-y-scroll rounded-2xl">
        <DialogHeader>
          <DialogTitle>Produto</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(submit)} className="flex flex-col gap-5">
            <InputForm control={methods.control} name="id" className="hidden" readOnly disabled />

            <InputForm control={methods.control} name="name" label="Nome" showMessageError />

            <SelectSearch
              label="Bucar por categoria"
              data={categorys?.map(({ name, id }) => ({ value: id, label: name }))}
              control={methods.control}
              name="category_id"
              onSelect={(e) => methods.setValue('category_id', e)}
              showMessageError
            />

            <SelectForm
              control={methods.control}
              name="size"
              label="Tamanho"
              data={[
                { label: 'PP', value: 'PP' },
                { label: 'P', value: 'P' },
                { label: 'M', value: 'M' },
                { label: 'G', value: 'G' },
                { label: 'GG', value: 'GG' },
                { label: 'UNIT', value: 'UNIT' },
                { label: 'NOT', value: 'NOT' },
              ]}
            />

            <InputForm
              control={methods.control}
              name="price"
              type="number"
              label="Preço"
              placeholder="R$ 00,00"
              step={0.01}
              showMessageError
            />

            <InputForm
              control={methods.control}
              name="min_quantity"
              type="number"
              label="Quantidade minima"
              placeholder="00"
              showMessageError
            />

            <InputForm control={methods.control} name="banner_url" type="url" label="URL da imagem" showMessageError />

            {imageValid && <img src={imageValid} alt="Imagem do produto" className="rounded-2xl" />}

            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
