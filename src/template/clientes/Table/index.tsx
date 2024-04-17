import { DataTable } from '@/components/ui-componets/data-table'
import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { useContextClient } from '@/contexts/dataContexts/clientesContext/useContextClient'
import { useEffect } from 'react'
import { columns } from './columns'

export const TableClient = ({ children }: { children?: React.ReactNode }) => {
  const { clients, getAllClients } = useContextClient()
  const { getAllAddresses } = useContextAddress()

  useEffect(() => {
    getAllAddresses()
    getAllClients()
  }, [])

  return (
    <>
      {children}
      <DataTable columns={columns} data={clients} inputFilter="name" />
    </>
  )
}
