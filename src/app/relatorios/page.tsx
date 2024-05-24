'use client'
import { Bolos } from '@/template/relatorios/bolos'
import Layout from '../dashboard/layout'
import { Wrap } from '@/components/comum/Wrap'
import { Toppers } from '@/template/relatorios/topper'
import { useRelatorios } from '@/contexts/relatorios'
import { useEffect } from 'react'
import { Produtos } from '@/template/relatorios/produtos/Produtos'
import { DatePickerForm } from '@/components/ui-componets/date-picker'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { PrintBolos } from '@/template/relatorios/bolos/PrintBolos'
import { useModalPrint } from '@/contexts/modalPrint'

export default function Relatorios() {
  const schema = z.object({ dateInitial: z.coerce.date(), dateFinal: z.coerce.date() })

  type FormData = z.infer<typeof schema>

  const form = useForm<FormData>()
  const { control, handleSubmit } = form
  const { getRelatorios, relatorios } = useRelatorios()

  useEffect(() => {
    getRelatorios()
  }, [])

  const { open, handleOpen } = useModalPrint()
  return (
    <Layout>
      <Wrap data-open={open} className="space-y-10 data-[open=true]:hidden">
        <Form {...form}>
          <form
            onSubmit={handleSubmit((data) => {
              getRelatorios(data.dateInitial, data.dateFinal)
            })}
            className="flex flex-wrap items-end gap-5 text-xs"
          >
            <DatePickerForm control={control} name="dateInitial" label="Data inicial" showMessageError />
            <DatePickerForm control={control} name="dateFinal" label="Data final" showMessageError />
            <Button type="submit">Buscar</Button>

            <Button
              variant="outline"
              onClick={() => {
                handleOpen()
              }}
            >
              Imprimir Bolos
            </Button>
          </form>
        </Form>
        <Bolos data={relatorios?.bolos} />

        <Toppers data={relatorios?.toppers} />

        <Produtos data={relatorios?.produtos} />
      </Wrap>

      {open && <PrintBolos data={relatorios?.bolos} />}
    </Layout>
  )
}
