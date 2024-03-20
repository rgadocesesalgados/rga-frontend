import { FormDataProdutos, ProductProps } from '@/app/produtos/types'
import { toBRL } from '@/app/utils/toBRL'
import Table from '@/components/comum/Table'
import { TButton } from '@/components/comum/Table/components/TButton'
import * as T from '@/components/comum/Table/styles'
import { CloseIcon, Pencil } from '@/components/icon'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { TableTemplateProps } from '@/template/types'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

export const TableProdutos = ({ openModal }: TableTemplateProps) => {
  const { getAllProducts, removeProduct, products } = useContextProduct()
  const { getAllCategorys } = useContextCategory()
  const { setValue } = useFormContext<FormDataProdutos>()

  const openModalProdutos = async ({
    id,
    name,
    category_name,
    banner,
    min_quantity,
    price,
    category_id,
  }: ProductProps) => {
    await getAllCategorys()
    setValue('id', id)
    setValue('categorySearch', category_name)
    setValue('name', name)
    setValue('category_id', category_id)
    setValue('banner_url', banner)
    setValue('min_quantity', min_quantity)
    setValue('price', price)
    openModal()
  }

  useEffect(() => {
    getAllCategorys()
    getAllProducts()
  }, [])

  return (
    <Table caption="Produtos" theads={['Nome', 'Categoria', 'Preço', 'Minimo', 'Ações']} onClick={openModal}>
      {products?.map((product) => (
        <tr key={product.id}>
          <T.td>{product.name}</T.td>
          <T.td>{product.category_name}</T.td>
          <T.td>{toBRL(product.price)}</T.td>
          <T.td>{product.min_quantity}</T.td>
          <T.tdAction className="flex gap-2">
            <TButton type="edit" onClick={() => openModalProdutos(product)}>
              <Pencil />
            </TButton>

            <TButton
              onClick={async () => {
                await removeProduct(product.id).then(() => {
                  toast.success('Removido com sucesso!')
                })
                getAllProducts()
              }}
            >
              <CloseIcon />
            </TButton>
          </T.tdAction>
        </tr>
      ))}
    </Table>
  )
}
