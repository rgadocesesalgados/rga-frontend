import { FormDataPedidos } from '@/app/pedidos/types'
import { InputForm } from '@/components/ui-componets/input-form'
import { InputToggle } from '@/components/ui-componets/input-toggle'
import { SelectForm } from '@/components/ui-componets/select-form'
import { TextareaForm } from '@/components/ui-componets/textarea-form'
import { useFormContext } from 'react-hook-form'

export const TopperForm = ({ CakeIndex }: { CakeIndex: number }) => {
  const { control, watch, setValue } = useFormContext<FormDataPedidos>()

  const imageUrl = watch(`cakes.${CakeIndex}.topper.banner`)
  const id = watch('id')

  return (
    <div className="flex flex-wrap gap-5 rounded-xl border bg-white p-5">
      <SelectForm
        control={control}
        name={`cakes.${CakeIndex}.topper.fornecedor`}
        label="Fornecedor"
        data={[
          { label: 'Principal', value: 'FORNECEDOR_PRINCIPAL' },
          { label: 'Secundario', value: 'FORNECEDOR_SECUNDARIO' },
        ]}
      />
      <InputForm control={control} name={`cakes.${CakeIndex}.topper.tema`} label="Tema" />

      <InputForm control={control} name={`cakes.${CakeIndex}.topper.name`} label="Nome" />

      <InputForm control={control} name={`cakes.${CakeIndex}.topper.idade`} label="Idade" />

      <InputForm
        control={control}
        name={`cakes.${CakeIndex}.topper.price`}
        label="Preço"
        type="number"
        typeof="numeric"
        min={0}
        step={0.01}
      />

      <TextareaForm control={control} name={`cakes.${CakeIndex}.topper.description`} label="Descrição" />

      <InputForm
        control={control}
        name={`cakes.${CakeIndex}.topper.banner`}
        label="Banner"
        placeholder="http://"
        type="url"
        showMessageError
      />

      {imageUrl && <img src={imageUrl} alt="Foto do topper" className="rounded-2xl" width={200} height={200} />}

      <InputForm control={control} name={`cakes.${CakeIndex}.topper.id`} className="hidden" />

      {!!id && (
        <InputToggle
          label="Recebido"
          control={control}
          name={`cakes.${CakeIndex}.topper.recebido`}
          onChange={(value) => setValue(`cakes.${CakeIndex}.topper.recebido`, value)}
        />
      )}
    </div>
  )
}
