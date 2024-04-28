import { FormDataPedidos } from '@/app/pedidos/types'
import { InputForm } from '@/components/ui-componets/input-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useId, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const TopperForm = ({ CakeIndex }: { CakeIndex: number }) => {
  const {
    control,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<FormDataPedidos>()
  const id = useId()

  const [imageUrl, setImageUrl] = useState('')

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const sendImage = e.target.files

    if (!sendImage) return

    const image = sendImage[0]
    const url = URL.createObjectURL(image)

    console.log({ url, image })

    setImageUrl(url)
    setValue(`cakes.${CakeIndex}.banner`, image)
  }

  return (
    <div className="space-y-5 rounded-xl border bg-white p-5">
      <InputForm control={control} name={`cakes.${CakeIndex}.topper.id`} className="hidden" />

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

      <InputForm control={control} name={`cakes.${CakeIndex}.topper.description`} label="Descrição" />

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
        {...register(`cakes.${CakeIndex}.topper.banner`, { onChange: handleFile })}
        className="hidden"
      />
      {errors[CakeIndex]?.banner && <p className="text-sm text-red-500">{errors[CakeIndex].banner.message}</p>}
    </div>
  )
}
