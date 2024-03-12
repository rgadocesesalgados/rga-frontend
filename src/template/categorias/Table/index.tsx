import * as T from '@/components/comum/Table/styles'
import Table from '@/components/comum/Table'
import { configTable } from '@/app/categorias/table/config'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { TButton } from '@/components/comum/Table/components/TButton'
import { CloseIcon, Pencil } from '@/components/icon'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { FormDataCategorias } from '../types'
import { TableTemplateProps } from '@/template/types'
import { toast } from 'react-toastify'

export const TableCategory = ({ openModal }: TableTemplateProps) => {
  const { categorys, removeCategory, getAllCategorys } = useContextCategory()
  const { setValue } = useFormContext<FormDataCategorias>()
  useEffect(() => {
    getAllCategorys()
  }, [])

  return (
    <Table caption="Categorias" theads={configTable} onClick={openModal}>
      {categorys.length > 0 &&
        categorys?.map(({ name, id }) => {
          return (
            <tr key={id}>
              <T.td>{name}</T.td>
              <T.tdAction>
                <TButton
                  type="edit"
                  onClick={() => {
                    setValue('id', id)
                    setValue('name', name)
                    openModal()
                  }}
                >
                  <Pencil />
                </TButton>

                <TButton
                  onClick={async () => {
                    removeCategory(id)
                      .then(() => {
                        getAllCategorys()
                        toast.success('Removido com sucesso!')
                      })
                      .catch((error) => {
                        toast.error(error.response.data?.error)
                        console.log(error)
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
