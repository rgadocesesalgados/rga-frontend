import { FormDataRecheios } from '@/app/recheios/types'
import { CheckboxForm } from '@/components/ui-componets/checkbox-form/CheckboxForm'
import { InputForm } from '@/components/ui-componets/input-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useContextRecheios } from '@/contexts/dataContexts/recheios/useContextRecheios'
import { useModal } from '@/contexts/modal'
import { PlusCircle } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

export const Modal = () => {
  const { open, handleOpen: handleOpenContext } = useModal()

  const methods = useFormContext<FormDataRecheios>()

  const { addRecheio, editRecheio, getAllRecheios } = useContextRecheios()

  const imageCake = methods.watch('banner')

  const imageValid = imageCake?.includes('https://') || imageCake?.includes('http://') ? imageCake : ''

  const handleOpen = async () => {
    handleOpenContext()
    methods.reset({})
    await getAllRecheios()
  }

  const submit = async ({ id, name, price, is_pesado, to_bento_cake, banner, price_fixed }: FormDataRecheios) => {
    if (id) {
      await editRecheio({ id, name, price, is_pesado, to_bento_cake, banner, price_fixed })
        .then(() => {
          toast.success(`${name} editado com sucesso!`)
          methods.reset({})
          getAllRecheios()
          handleOpenContext()
        })
        .catch((error) => toast.error(error.response.data?.error))

      return
    }
    await addRecheio({
      name,
      price,
      is_pesado,
      to_bento_cake,
      banner,
      price_fixed,
    })
      .then(() => {
        toast.success(`${name} adicionado com sucesso!`)
        getAllRecheios()
        handleOpenContext()
        methods.reset()
      })
      .catch((error) => toast.error(error.response.data?.error))

    console.log({ name, price, is_pesado, to_bento_cake })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button>
          Adiconar Recheio <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-screen overflow-y-scroll rounded-2xl">
        <DialogHeader>
          <DialogTitle>Recheios</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form className="flex flex-col gap-5" onSubmit={methods.handleSubmit(submit)}>
            <InputForm control={methods.control} name="id" className="hidden" />
            <InputForm control={methods.control} name="name" label="Nome" />
            <InputForm
              control={methods.control}
              name="price"
              label="Preço/R$"
              step={0.01}
              min={0}
              type="number"
              typeof="numeric"
              placeholder="R$ 00,00"
            />
            <CheckboxForm
              control={methods.control}
              name="is_pesado"
              label="Recheio pesado"
              description="Se o recheio contém morango ou ameixa ele é pesado"
            />
            <CheckboxForm
              control={methods.control}
              name="to_bento_cake"
              label="Bento cake"
              description="Se o recheio pode ir no bento cake"
            />

            <CheckboxForm
              control={methods.control}
              name="price_fixed"
              label="Valor fixo"
              description="O valor do recheio é fixo e independente de outros recheios"
            />

            <InputForm control={methods.control} name="banner" label="Foto" placeholder="https://link-da-foto.com.br" />

            {imageValid && <img src={imageValid} alt="Imagem do recheio" className="rounded-2xl" />}

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
