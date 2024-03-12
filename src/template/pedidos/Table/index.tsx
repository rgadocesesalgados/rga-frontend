import * as T from '@/components/comum/Table/styles'
import Table from '@/components/comum/Table'
import { useContextPedidos } from '@/contexts/dataContexts/ordersContext/useContextPedidos'
import { TableTemplateProps } from '@/template/types'
import { TButton } from '@/components/comum/Table/components/TButton'
import { CloseIcon, Pencil } from '@/components/icon'
import { useContextClient } from '@/contexts/dataContexts/clientesContext/useContextClient'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'

export const TablePedidos = ({ openModal }: TableTemplateProps) => {
  const { getAllClients } = useContextClient()
  const { getAllCategorys } = useContextCategory()
  const { getAllProducts } = useContextProduct()
  const { getAllAddresses } = useContextAddress()
  const openModalOrder = async () => {
    openModal()
    await getAllClients()
    await getAllCategorys()
    await getAllProducts()
    await getAllAddresses()
  }

  const { orders } = useContextPedidos()
  return (
    <Table
      caption="Pedidos"
      theads={['Cliente', 'Data', 'Entrega', 'Total', 'Status', 'Ações']}
      onClick={() => {
        openModalOrder()
      }}
    >
      {orders?.map(({ id, client_id, data }) => {
        return (
          <tr key={id}>
            <T.td>{client_id}</T.td>
            <T.td>{data}</T.td>
            <T.tdAction>
              <TButton type="edit">
                <Pencil />
              </TButton>

              <TButton>
                <CloseIcon />
              </TButton>
            </T.tdAction>
          </tr>
        )
      })}
    </Table>
  )
}
