import { FormDataPedidos } from '@/app/pedidos/types'
import { Button } from '@/components/comum/Button'
import Input from '@/components/comum/Input'
import { Select } from '@/components/comum/Select'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const Payment = () => {
  const { fields, append } = useFieldArray<FormDataPedidos>({
    name: 'payment',
  })
  const {
    register,
    formState: { errors },
  } = useFormContext<FormDataPedidos>()
  return (
    <>
      <p>Formas de Pagamento</p>
      {fields.map((fields, index) => (
        <div key={fields.id} className="flex  flex-col gap-3">
          <div className="flex items-end gap-3">
            <Select
              {...register(`payment.${index}.formPayment`)}
              label="Forma de pagamento"
              data={['DINHEIRO', 'CARTÃO DE CREDITO', 'CARTÃO DE DEBITO', 'PIX', 'DUPLICATA']}
              error={errors?.payment?.[index]?.formPayment?.message}
            />

            <Input
              {...register(`payment.${index}.value`)}
              label="Valor"
              type="number"
              error={errors?.payment?.[index]?.value?.message}
              step={0.01}
            />
          </div>

          <Input
            {...register(`payment.${index}.paid`)}
            label="Pago"
            type="checkbox"
            error={errors?.payment?.[index]?.paid?.message}
            required={false}
          />
        </div>
      ))}
      <Button color="dash" onClick={() => append({})}>
        Adicionar Forma de Pagamento
      </Button>
    </>
  )
}
