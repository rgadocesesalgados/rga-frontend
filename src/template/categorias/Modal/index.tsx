import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FormDataCategorias } from '../types'
import { useModal } from '@/contexts/modal'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PlusCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { InputForm } from '@/components/ui-componets/input-form'

export const ModalCategory = () => {
  const { openCategory, handleOpenCategory } = useModal()

  const methods = useFormContext<FormDataCategorias>()

  const { addCategory, editCategory, getAllCategorys } = useContextCategory()

  const submit = async ({ name, id, priority, boxes }: FormDataCategorias) => {
    if (id) {
      await editCategory({ name, id, priority, boxes: boxes.map(({ size }) => size) })
        .then(() => {
          toast.success(`${name} editado com sucesso!`)
          handleOpenCategory()
        })
        .catch((error) => {
          toast.error(error.response?.data?.error)
        })
    } else {
      await addCategory(
        name,
        priority,
        boxes.map(({ size }) => size),
      )
        .then(() => {
          handleOpenCategory()
          toast.success(`${name} criado com sucesso!`)
        })
        .catch((error) => {
          toast.error(error.response?.data?.error)
        })
    }
    getAllCategorys()
  }

  const { append, remove, fields } = useFieldArray({ control: methods.control, name: 'boxes' })
  return (
    <Dialog
      open={openCategory}
      onOpenChange={() => {
        handleOpenCategory()
        methods.reset({ boxes: [], id: '', name: '' })
      }}
    >
      <DialogTrigger asChild>
        <Button>
          Adiconar categoria <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Categoria</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(submit)} className="flex flex-col gap-5">
            <InputForm control={methods.control} name="id" className="hidden" disabled readOnly />

            <InputForm
              placeholder="Nome da categoria"
              label="Nome"
              control={methods.control}
              name="name"
              showMessageError
            />

            <InputForm
              control={methods.control}
              name="priority"
              showMessageError
              type="number"
              typeof="numeric"
              label="Prioriade"
              description="Esse campo irá definir qual categia tem prioriade no pedido"
            />

            {fields?.map(({ id }, i) => (
              <div key={id} className="flex items-center gap-2">
                <InputForm
                  control={methods.control}
                  name={`boxes.${i}.size`}
                  showMessageError
                  type="number"
                  typeof="numeric"
                  placeholder="tamanho"
                />

                <Button variant="ghost" size="icon" type="button" onClick={() => remove(i)}>
                  <XCircle className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="ghost" onClick={() => append({})}>
              Adicionar caixa <PlusCircle />
            </Button>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
