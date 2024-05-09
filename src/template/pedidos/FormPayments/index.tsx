import { FormDataPedidos } from '@/app/pedidos/types'
import { DatePickerForm } from '@/components/ui-componets/date-picker'
import { InputForm } from '@/components/ui-componets/input-form'
import { InputToggle } from '@/components/ui-componets/input-toggle'
import { SelectForm } from '@/components/ui-componets/select-form/SelectForm'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const FormPayment = () => {
  const payments = useFieldArray<FormDataPedidos>({ name: 'payment' })

  return (
    <div className="flex flex-col gap-3">
      <Label className="mb-3 font-bold capitalize">Formas de pagamento:</Label>

      {payments.fields.map((field, index) => {
        const methods = useFormContext<FormDataPedidos>()
        return (
          <div key={field.id} className="rounded-xl even:bg-slate-50">
            <div key={field.id} className="flex flex-wrap gap-3 py-3">
              <SelectForm
                control={methods.control}
                name={`payment.${index}.formPayment`}
                data={[
                  { label: 'Dinheiro', value: 'DINHEIRO' },
                  { label: 'Cartao de crédito', value: 'CARTAO_DE_CREDITO' },
                  { label: 'Cartao de débito', value: 'CARTAO_DE_DEBITO' },
                  { label: 'Pix', value: 'PIX' },
                  { label: 'Duplicata', value: 'DUPLICATA' },
                ]}
                label="Tipo"
              />

              <div className="flex-1 basis-24">
                <InputForm
                  control={methods.control}
                  name={`payment.${index}.value`}
                  placeholder="R$ 00,00"
                  type="number"
                  typeof="numeric"
                  step={0.01}
                  min={0}
                  label="Valor"
                  showMessageError
                />
              </div>

              <InputToggle
                control={methods.control}
                name={`payment.${index}.paid`}
                onChange={(value) => methods.setValue(`payment.${index}.paid`, value)}
                label="Pago"
              />

              <DatePickerForm control={methods.control} name={`payment.${index}.date`} label="Data" />

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => payments.remove(index)}
                className="self-end"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      })}

      <Button variant="outline" type="button" onClick={() => payments.append({})}>
        Adiconar forma de pagamento
        <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
