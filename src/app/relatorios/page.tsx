'use client'
import { Bolos } from '@/template/relatorios/bolos'
import Layout from '../dashboard/layout'
import { Wrap } from '@/components/comum/Wrap'
import { Toppers } from '@/template/relatorios/topper'
import { useRelatorios } from '@/contexts/relatorios'
import { useEffect } from 'react'
import { Produtos } from '@/template/relatorios/produtos/Produtos'
import { DatePickerForm } from '@/components/ui-componets/date-picker'
import { FormProvider, useFieldArray } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { PrintBolos } from '@/template/relatorios/bolos/PrintBolos'
import { useModalPrint } from '@/contexts/modalPrint'
import { GetOrder } from '@/types/order'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { PrintToppers } from '@/template/relatorios/topper/PrintToppers'
import { useFormRelatorio } from './useFormRelatorio'
import { FormData } from './types'
import { CirclePlus, CircleX } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const status: GetOrder['status'][] = ['RASCUNHO', 'ANOTADO', 'EM_PRODUCAO', 'CANCELADO', 'ENTREGUE']

export default function Relatorios() {
  const form = useFormRelatorio()

  const { control, handleSubmit } = form
  const { getRelatorios, relatorios } = useRelatorios()

  useEffect(() => {
    getRelatorios({ dateFinal: null, dateInicial: null, status: ['RASCUNHO', 'ANOTADO'] })
  }, [])

  const { open, openTopper } = useModalPrint()
  const { append, fields, remove } = useFieldArray<FormData>({ control, name: 'status' })
  return (
    <Layout>
      <Wrap data-open={open || openTopper} className="space-y-10 data-[open=true]:hidden">
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={handleSubmit((data) => {
                getRelatorios({
                  dateInicial: data.dateInitial,
                  dateFinal: data.dateFinal,
                  status: data.status?.map((s) => s.value) || [],
                })
              })}
              className="flex flex-wrap items-end gap-5 text-xs"
            >
              <DatePickerForm control={control} name="dateInitial" label="Data inicial" showMessageError />
              <DatePickerForm control={control} name="dateFinal" label="Data final" showMessageError />

              <div className="flex flex-wrap gap-2 rounded-2xl border bg-white p-1">
                {fields.map((field, index) => {
                  return (
                    <Badge key={field.id} variant={field.value?.toLocaleLowerCase() as BadgeProps['variant']}>
                      {field.value} <CircleX onClick={() => remove(index)} className="ml-2 h-4 w-4" />
                    </Badge>
                  )
                })}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="ghost">
                      Filtro <CirclePlus className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {status.map((s) => (
                      <DropdownMenuItem key={s} onClick={() => append({ value: s })}>
                        {s}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button type="submit">Buscar</Button>
            </form>
          </Form>

          <Bolos data={relatorios?.bolos} />

          <Toppers data={relatorios?.toppers} />

          <Produtos data={relatorios?.produtos} />
        </FormProvider>
      </Wrap>

      {open && <PrintBolos data={relatorios?.bolos} />}

      {openTopper && <PrintToppers data={relatorios?.toppers} />}
    </Layout>
  )
}
