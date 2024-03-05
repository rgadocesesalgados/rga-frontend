import * as T from '@/components/comum/Table/styles'
import Table from '@/components/comum/Table'
import { useContextClient } from '@/contexts/dataContexts/clientesContext/useContextClient'
import { TButton } from '@/components/comum/Table/components/TButton'
import { CloseIcon, Pencil } from '@/components/icon'
import { TableTemplateProps } from '@/template/types'
import { ClientProps, FormDataCliente } from '@/app/clientes/types'
import { useFormContext } from 'react-hook-form'
import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { useEffect } from 'react'

export const TableClient = ({ openModal }: TableTemplateProps) => {
  const { clients, removeClient, getAllClients } = useContextClient()
  const { address, getAllAddresses } = useContextAddress()
  const { setValue } = useFormContext<FormDataCliente>()

  const edit = ({ id, name, tel, address_id }: ClientProps) => {
    setValue('id', id)
    setValue('inputSearch', address?.find((address) => address.id === address_id)?.address_complete)
    setValue('name', name)
    setValue('tel', tel)
    setValue('address_id', address_id)
    openModalClient()
  }

  const openModalClient = async () => {
    await getAllAddresses()

    openModal()
  }

  useEffect(() => {
    getAllAddresses()
    getAllClients()
  }, [])

  return (
    <Table caption="Clientes" theads={['Nome', 'Telefone', 'Ações']} onClick={openModalClient}>
      {clients?.map(({ name, id, tel, address_id }) => (
        <tr key={id}>
          <T.td>{name}</T.td>
          <T.td>{tel}</T.td>

          <T.tdAction>
            <TButton type="edit" onClick={() => edit({ id, name, tel, address_id })}>
              <Pencil />
            </TButton>
            <TButton onClick={async () => await removeClient(id)}>
              <CloseIcon />
            </TButton>
          </T.tdAction>
        </tr>
      ))}
    </Table>
  )
}
