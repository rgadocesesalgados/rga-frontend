import * as S from './styles'

import { FormDataPedidos } from '@/app/pedidos/types'
import { useFormCorePedidos } from '@/app/pedidos/useFormCorePedidos'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectForm } from '@/components/ui-componets/select-form'
import { ChangeEvent, useId, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Recheios } from '../recheios'
import { TextareaForm } from '@/components/ui-componets/textarea-form'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { CheckboxForm } from '@/components/ui-componets/checkbox-form/CheckboxForm'

export const Cake = ({ index, children }: { index: number; children: React.ReactNode }) => {
  const id = useId()
  const methods = useFormContext<FormDataPedidos>()
  const cake = useFormCorePedidos()

  const [imageUrl, setImageUrl] = useState('')

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const sendImage = e.target.files

    if (!sendImage) return

    const image = sendImage[0]
    const url = URL.createObjectURL(image)

    console.log({ url, image })

    setImageUrl(url)
    methods.setValue(`cakes.${index}.banner`, image)
  }

  return (
    <S.containerCake>
      <InputForm control={methods.control} name={`cakes.${index}.id`} className="hidden" />

      <div className="flex gap-3">
        <InputForm
          type="number"
          min={0}
          step={0.01}
          typeof="numeric"
          control={methods.control}
          name={`cakes.${index}.peso`}
          label="Peso/kg"
          onChange={() => {
            methods.setValue(`cakes.${index}.price`, cake.getPriceCake(index))
          }}
        />
        <SelectForm
          control={methods.control}
          name={`cakes.${index}.formato`}
          label="Formato"
          data={[
            { label: 'Redondo', value: 'REDONDO' },
            { label: 'Retangular', value: 'RETANGULAR' },
          ]}
        />
        <SelectForm
          control={methods.control}
          name={`cakes.${index}.massa`}
          label="Massa"
          data={[
            { label: 'Branca', value: 'BRANCA' },
            { label: 'Chocolate', value: 'CHOCOLATE' },
            { label: 'Massa mesclada', value: 'MASSA_MESCLADA' },
          ]}
        />
      </div>

      <Recheios index={index} />

      <TextareaForm control={methods.control} name={`cakes.${index}.decoracao`} label="Descricão" />

      <InputForm
        control={methods.control}
        name={`cakes.${index}.price`}
        label="Preço"
        type="number"
        typeof="numeric"
        min={0}
        step={0.01}
      />

      <Label
        htmlFor={id}
        data-image={!!imageUrl}
        className="flex items-center justify-center rounded-xl border p-3 even:bg-white data-[image=true]:w-min data-[image=true]:items-start data-[image=true]:justify-start "
      >
        {!imageUrl && (
          <>
            Selecionar Imagem <Upload className="ml-2 h-4 w-4" />
          </>
        )}
        {imageUrl && <Image src={imageUrl} alt="banner" width={200} height={200} className="max-w-7xl rounded-xl" />}
      </Label>
      <Input
        type="file"
        id={id}
        accept="image/png, image/jpeg, image/jpg"
        {...methods.register(`cakes.${index}.banner`, { onChange: handleFile })}
        className="hidden"
      />
      {methods.formState?.errors?.cakes && (
        <p className="text-sm text-red-500">{methods.formState.errors.cakes[index].banner.message}</p>
      )}

      <CheckboxForm control={methods.control} name={`cakes.${index}.tem_topper`} label="Tem topper" />

      {children}
    </S.containerCake>
  )
}
