import * as T from '@/components/comum/Table/styles'
import Table from '@/components/comum/Table'
import { configTable } from '@/app/categorias/table/config'
import { useContextCategory } from '@/contexts/dataContexts/categorysContext/useContextCategory'
import { TButton } from '@/components/comum/Table/components/TButton'
import { CloseIcon, Pencil } from '@/components/icon'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { FormDataCategorias } from '../types'

interface TableCategoryProps {
  openModal: () => void
}

export const TableCategory = ({ openModal }: TableCategoryProps) => {
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
                  onClick={() => {
                    setValue('id', id)
                    setValue('name', name)
                    openModal()
                  }}
                >
                  <Pencil />
                </TButton>

                <TButton
                  type="delete"
                  onClick={async () => {
                    await removeCategory(name)
                    await getAllCategorys()
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
