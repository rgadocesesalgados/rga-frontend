'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { Dialog } from '@radix-ui/react-dialog'
import { DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { columns } from './columns'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api/apiClient'
import { schema, Supplier } from './schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { ErrorApi } from '@/services/api/types'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { maskTel } from '../utils/masks/maskTel'

export default function Fornecedores() {
  const [open, setOpen] = useState(false)
  const { data } = useQuery<Supplier & { id: string }[]>({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const response = await api.get('/supplier')

      console.log(response.data)
      return response.data
    },
  })

  const queryClient = useQueryClient()

  const addSupplier = useMutation({
    mutationFn: async ({ name, tel }: Supplier) => {
      await api.post(`/supplier?name=${name}&tel=${tel}`)
    },

    onSuccess: () => {
      setOpen(false)
      reset()
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    },

    onError: (erro) => {
      const error = erro as ErrorApi
      toast.error(error.response.data.error)
      console.log(error.response.data)
    },
  })

  const table = useReactTable({
    columns: columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
  })

  const methods = useForm<Supplier>({ resolver: zodResolver(schema) })

  const { register, handleSubmit, reset, setValue } = methods

  return (
    <Layout>
      <Wrap className="flex flex-col gap-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-2">
              Adicionar fornecedor <PlusCircle className="h-5 w-4" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>Fornecedor</DialogTitle>

            <form
              onSubmit={handleSubmit(({ name, tel }) => addSupplier.mutate({ name, tel }))}
              className="flex flex-col gap-5"
            >
              <Input {...register('name')} placeholder="Nome" />
              <Input
                {...register('tel')}
                placeholder="(46) 9 9999-9999"
                onChange={(e) => setValue('tel', maskTel(e.target.value))}
              />

              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className=" rounded-2xl border bg-white">
          <DataTable table={table} />
        </div>
      </Wrap>
    </Layout>
  )
}
