import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { useEffect } from 'react'
import { DataTable } from '@/components/ui-componets/data-table'
import { columns } from './columns'

export const TableAddress = ({ children }: { children: React.ReactNode }) => {
  const { address, getAllAddresses } = useContextAddress()

  useEffect(() => {
    getAllAddresses()
  }, [])

  return (
    <>
      {children}
      <DataTable columns={columns} data={address} inputFilter="rua" />
    </>
  )
}
