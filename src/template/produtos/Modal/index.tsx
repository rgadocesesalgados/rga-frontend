import { FormDataProdutos } from '@/app/produtos/types'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { useModal } from '@/contexts/modal'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { PlusCircle, Upload } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
export const ModalProdutos = () => {
  const { openProduct, handleOpenProduct } = useModal()
  const { categorys } = useContextCategory()
  const { getAllProducts, addProduct, editProduct } = useContextProduct()

  const methods = useFormContext<FormDataProdutos>()

  const [imageUrl, setImageUrl] = useState('')

  const submit = async ({ id, name, min_quantity, price, category_id, banner_url }: FormDataProdutos) => {
    if (id) {
      editProduct({ id, name, price, category_id, min_quantity, banner: banner_url })
        .then(() => {
          getAllProducts()
          handleOpenProduct()
          methods.reset()
          toast.success(`${name} editado com sucesso!`)
        })
        .catch((error) => toast.error(error.response.data?.error))
    } else {
      addProduct({ name, min_quantity, price, category_id, banner: banner_url })
        .then(() => {
          getAllProducts()
          handleOpenProduct()
          toast.success(`${name} adicionado com sucesso!`)
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.response.data?.error)
        })
    }
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const sendImage = e.target.files

    if (!sendImage) return

    const image = sendImage[0]
    const url = URL.createObjectURL(image)
    setImageUrl(url)
    methods.setValue('banner_url', image)
  }

  return (
    <Dialog
      open={openProduct}
      onOpenChange={() => {
        handleOpenProduct()
        methods.reset({})
        setImageUrl('')
      }}
    >
      <DialogTrigger asChild>
        <Button type="submit">
          Adicionar produto <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo produto</DialogTitle>
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

            <Label htmlFor="imagem" className="flex items-center justify-center rounded-xl border p-3">
              {!imageUrl && (
                <>
                  Selecionar Imagem <Upload className="ml-2 h-4 w-4" />
                </>
              )}
              {imageUrl && <Image src={imageUrl} alt="banner" width={200} height={200} className="w-full rounded-xl" />}
            </Label>
            <Input
              type="file"
              id="imagem"
              accept="image/png, image/jpeg, image/jpg"
              {...methods.register('banner_url', { onChange: handleFile })}
              className="hidden"
            />
            {methods.formState.errors.banner_url && (
              <p className="text-sm text-red-500">{methods.formState.errors.banner_url.message}</p>
            )}

            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
