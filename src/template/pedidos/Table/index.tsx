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
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Tag } from '@/components/comum/Tag'

export const TablePedidos = ({ openModal }: TableTemplateProps) => {
  const { orders, getAllOrders, removeOrder } = useContextPedidos()
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

  useEffect(() => {
    getAllOrders()
  }, [])

  enum tags {
    RASCUNHO = 'yellow',
    ANOTADO = 'slate',
    EM_PRODUCAO = 'blue',
    ENTREGUE = 'green',
    CANCELADO = 'red',
  }

  return (
    <Table
      caption="Pedidos"
      theads={['Data', 'Cliente', 'Delivery', 'Total', 'Status', 'Ações']}
      onClick={() => {
        openModalOrder()
      }}
    >
      {orders?.map(({ id, client_name, data, delivery, total, status }) => {
        return (
          <tr key={id}>
            <T.td>{new Date(data).toLocaleDateString()}</T.td>
            <T.td>{client_name}</T.td>
            <T.td>{delivery ? 'Sim' : 'Não'}</T.td>
            <T.td>{total}</T.td>
            <T.td>
              <Tag bgColor={tags[status]}>{status}</Tag>
            </T.td>
            <T.tdAction>
              <TButton type="edit">
                <Pencil />
              </TButton>

              <TButton
                onClick={() => {
                  removeOrder(id)
                    .then(() => {
                      toast.success('Removido com sucesso!')
                      getAllOrders()
                    })
                    .catch((error) => {
                      console.log(error)
                      toast.error(error.response.data.error)
                    })
                }}
              >
                <CloseIcon />
              </TButton>
            </T.tdAction>
          </tr>
        )
      })}
    </Table>
  )
}
