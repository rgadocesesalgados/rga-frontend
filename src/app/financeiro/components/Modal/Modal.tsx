import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'
import { InputForm } from '@/components/ui-componets/input-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DatePickerForm } from '@/components/ui-componets/date-picker'
import { Form } from '@/components/ui/form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api/apiClient'
import { maskTel } from '@/app/utils/masks/maskTel'
import { useState } from 'react'
import { OutProps } from '../../hooks/useQuerys'
import { ErrorApi } from '@/services/api/types'
import { toast } from 'react-toastify'

const schema = z.object({
  supplier: z.string(),
  date: z.coerce.number().transform((date) => new Date(date).getTime()),
  value: z.coerce.number(),
})

interface SupplierProps {
  id: string
  name: string
  tel: string
}

type FormData = z.infer<typeof schema>
export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm<FormData>({ resolver: zodResolver(schema) })

  const { control, handleSubmit, setValue, reset } = methods

  const { data } = useQuery<SupplierProps[]>({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const response = await api.get('/supplier')

      console.log(response.data)
      return response.data
    },
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ date, supplier, value }: Omit<OutProps, 'id'>) => {
      await api.post(`/out?date=${date}&supplierId=${supplier}&value=${value}`)
    },

    onSuccess: () => {
      setIsOpen(false)
      reset()
      queryClient.invalidateQueries({ queryKey: ['outs'] })
    },

    onError: (erro) => {
      const error = erro as ErrorApi
      toast.error(error.response.data.error)
      console.log(error.response.data)
    },
  })

  return (
    <Dialog open={!!isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar saída</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saída</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form
            onSubmit={handleSubmit(({ date, supplier, value }) => {
              mutate({ date, supplier, value })
            })}
            className="flex flex-col gap-5"
          >
            <SelectSearch
              label="Fornecedor"
              control={control}
              name="supplier"
              data={data?.map((supplier) => ({
                value: supplier.id,
                label: supplier.name,
                complement: maskTel(supplier.tel),
              }))}
              onSelect={(value) => setValue('supplier', value)}
              showMessageError
            />

            <div className="flex flex-col gap-5 sm:flex-row">
              <InputForm
                control={control}
                name="value"
                type="number"
                typeof="numeric"
                step={0.01}
                min={0}
                placeholder="R$ 00,00"
                showMessageError
              />
              <DatePickerForm control={control} name="date" showMessageError />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
