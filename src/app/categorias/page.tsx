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
import { useStateCategorias } from './useStateCategorias'
import { useFormCategorias } from './useFormCategorias'
import { getCategorias } from '../produtos/function'
import { useEffect } from 'react'
import { api } from '@/services/api/apiClient'
import { toast } from 'react-toastify'
import { FormDataCategorias } from './types'

export interface CategoryProps {
  name: string
}

let idName = ''

export default function Categorias() {
  const toogleModal = () => {
    setEdit(false)
    setIsOpen(!isOpen)
  }

  const deleteCategory = async (name: string) => {
    await api
      .delete('/category', { params: { name } })
      .then(() => {
        toast.success(` ${name} deletado com sucesso!`)
        getCategorias({ setData })
      })
      .catch((error) => {
        toast.warn(error.response.data?.error)
      })
  }

  const saveSubmit = async (data: FormDataCategorias) => {
    await api
      .post('/category', data)
      .then(() => {
        toast.success('Cadastrado com sucesso!')
        setIsOpen(!isOpen)
        getCategorias({ setData })
        reset()
      })
      .catch((error) => {
        console.log(error)
        toast.warn(error.response.data?.error)
      })
  }

  const editSubmit = async (data: FormDataCategorias) => {
    await api
      .patch('/category', { new_name: data.name }, { params: { name: idName } })
      .then(() => {
        toast.success('Editado com sucesso!')
        setIsOpen(!isOpen)
        getCategorias({ setData })
        reset()
      })
      .catch((error) => {
        console.log(error)
        toast.warn(error.response.data?.error)
      })
  }

  const editItemModal = (name: string) => {
    setValue('name', name)
    idName = name
    setEdit(true)
    setIsOpen(!isOpen)
  }

  const { data, setData, edit, setEdit, isOpen, setIsOpen } = useStateCategorias()

  const { register, handleSubmit, setValue, errors, reset } = useFormCategorias()

  useEffect(() => getCategorias({ setData }), [])

  const submit = edit ? editSubmit : saveSubmit
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
                  <Pencil />
                </EditItem>

                <DeleteItem onClick={() => deleteCategory(name)}>
                  <CloseIcon />
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
