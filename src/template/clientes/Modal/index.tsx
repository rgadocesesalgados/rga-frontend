import { FormDataCliente } from '@/app/clientes/types'
import { AddressProps } from '@/app/enderecos/types'
import { MFooter } from '@/components/comum/Modal/components/MFooter'
import { InputForm } from '@/components/ui-componets/input-form'
import { SelectSearch } from '@/components/ui-componets/select-search'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useContextClient } from '@/contexts/dataContexts/clientesContext/useContextClient'
import { useModal } from '@/contexts/modal'
import { api } from '@/services/api/apiClient'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { PlusCircle } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

const fetchDebounce = debounce((func: () => void) => func(), 500)

export const ModalClient = () => {
  const { openClient, handleOpenClient } = useModal()

  const { editClient, addClient, getAllClients } = useContextClient()
  const methods = useFormContext<FormDataCliente>()

  const submit = async ({ id, name, tel, address_id }: FormDataCliente) => {
    if (id) {
      editClient({ id, name, tel, address_id })
        .then(() => {
          handleOpenClient()
          methods.reset({})
          getAllClients()
          toast.success(`${name} editado com sucesso!`)
        })
        .catch((error) => {
          toast.error(error.response.data?.error)
          console.log(error)
        })
    } else {
      console.log({ name, tel, address_id })
      addClient({ name, tel, address_id })
        .then(() => {
          handleOpenClient()
          methods.reset({})
          getAllClients()
          toast.success(`${name} adicionado com sucesso!`)
        })
        .catch((error) => {
          toast.error(error.response.data?.error)

          console.log(error)
        })
    }
  }

  const [enebleSearch, setEnableSearch] = useState(false)
  const [address, setAddress] = useState('rua')
  const [addressComplete, setAddressComplete] = useQueryState('address_complete')

  const { data, refetch, isLoading } = useQuery<AddressProps[]>({
    queryKey: ['search-address', address],
    queryFn: async () => {
      const response = await api.get(`/search-address/${address}`)
      console.log(response.data)
      return response.data
    },
    enabled: enebleSearch && address.length > 2,
  })

  useEffect(() => {
    fetchDebounce(() => {
      setEnableSearch(true)
      refetch().finally(() => setEnableSearch(false))
      console.log('debounce:address')
    })
  }, [address])
  return (
    <Dialog
      open={openClient}
      onOpenChange={() => {
        handleOpenClient()
        setAddressComplete('')
        methods.reset({})
      }}
    >
      <DialogTrigger asChild>
        <Button>
          Adicionar cliente
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar cliente</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(submit)} className="flex flex-col gap-5">
            <InputForm control={methods.control} name="id" readOnly className="hidden" />

            <InputForm
              control={methods.control}
              name="name"
              type="text"
              label="Nome"
              placeholder="Nome"
              showMessageError
            />

            <InputForm
              control={methods.control}
              name="tel"
              type="text"
              label="Telefone"
              placeholder="Telefone"
              showMessageError
            />

            <SelectSearch
              control={methods.control}
              name="address_id"
              label="Endereço"
              data={data?.map(({ id, address_complete }) => ({ value: id, label: address_complete }))}
              onSelect={(value) => methods.setValue('address_id', value)}
              onValueChange={(value) => {
                setAddress(value)
              }}
              shouldFilter={false}
              isLoading={isLoading}
              displayValue={addressComplete}
            />

            <MFooter>
              <Button type="submit">Salvar</Button>
            </MFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
