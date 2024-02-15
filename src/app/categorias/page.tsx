'use client'
import Table from '@/components/comum/Table'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { Std } from '@/components/comum/Table/styles'
import { DeleteItem, EditItem } from '@/components/comum/Table/tableActions'
import { CloseIcon, Pencil } from '@/components/icon'
import Modal from '@/components/comum/Modal/Index'
import { Sform } from '../login/styles'
import Input from '@/components/comum/Input'
import { Button } from '@/components/comum/Button'
import { useHandleCategorias } from '@/hooks/categorias/useHandleCategoria'

export interface CategoryProps {
  name: string
}

export default function Categorias() {
  const {
    toogleModal,
    data,
    editItemModal,
    deleteCategory,
    isOpen,
    setIsOpen,
    handleSubmit,
    submit,
    register,
    errors,
    edit,
    reset,
  } = useHandleCategorias()
  return (
    <Layout>
      <Wrap>
        <Table caption="Categorias" theads={['Nome', 'Ações']} onClick={toogleModal}>
          {!data.length && (
            <tr>
              <td>Cadastre uma categoria...</td>
              <td></td>
            </tr>
          )}
          {data?.map(({ name }) => (
            <tr key={name}>
              <Std>{name}</Std>
              <Std className="flex gap-2">
                <EditItem onClick={() => editItemModal(name)}>
                  <Pencil strokeWidth={2} />
                </EditItem>

                <DeleteItem onClick={() => deleteCategory(name)}>
                  <CloseIcon strokeWidth={3} />
                </DeleteItem>
              </Std>
            </tr>
          ))}
        </Table>
      </Wrap>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Categoria">
        <Sform onSubmit={handleSubmit(submit)}>
          <Input placeholder="Nome da categoria" {...register('name')} error={errors.name?.message} />
          <div className="flex justify-end gap-5">
            <Button
              color="red"
              type="button"
              onClick={() => {
                setIsOpen(!isOpen)
                reset()
              }}
            >
              Cancelar
            </Button>
            {<Button>{edit ? 'Salvar alterações' : 'Cadastrar'}</Button>}
          </div>
        </Sform>
      </Modal>
    </Layout>
  )
}
