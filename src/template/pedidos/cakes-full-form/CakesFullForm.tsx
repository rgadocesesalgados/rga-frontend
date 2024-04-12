import { FormDataPedidos } from '@/app/pedidos/types'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const CakesFullForm = () => {
  const { fields, append, remove } = useFieldArray<FormDataPedidos>({ name: 'cakes' })
  const methods = useFormContext<FormDataPedidos>()
  return (
    <div className="flex flex-col">
      <Label className="mb-3 font-bold capitalize">Bolos completos</Label>

      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex flex-col gap-3">
            <InputForm control={methods.control} name={`cakes.${index}.id`} className="hidden" />

            <InputForm control={methods.control} name={`cakes.${index}.peso`} label="Peso/kg" />

            <Recheios index={index} />

            <Button size="icon" variant="destructive" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      })}
      <Button variant="outline" type="button" onClick={() => append({})}>
        Adicionar bolo <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

const Recheios = ({ index }: { index: number }) => {
  const { fields, append } = useFieldArray<FormDataPedidos>({ name: `cakes.${index}.recheios` })
  const methods = useFormContext<FormDataPedidos>()

  return (
    <>
      <Label className="mb-3 font-bold capitalize">Recheios</Label>

      {fields.map((field, index) => (
        <SelectSearch
          key={field.id}
          control={methods.control}
          name={`cakes.${index}.recheios`}
          data={[{ label: '', value: '' }]}
          onSelect={() => {}}
        />
      ))}
      <Button variant="outline" type="button" onClick={() => append({})}>
        Adicionar recheio
        <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </>
  )
}
