'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import Table from '@/components/comum/Table'
import Modal from '@/components/comum/Modal/Index'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Sform } from '../login/styles'
import Input from '@/components/comum/Input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/comum/Button'
import { api } from '@/services/api/apiClient'
import { toast } from 'react-toastify'
import { schema } from './scheme'
import { FormData } from './types'
import { Std } from '@/components/comum/Table/styles'
import { EditItem } from '@/components/comum/Table/tableActions'
import { Pencil } from '@/components/icon'
import { getEnderecos } from './functions'

export default function Enderecos() {
  const [isOpen, setIsOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState<FormData[]>([])
  const toggle = () => {
    setIsOpen(!isOpen)
    setEdit(false)
    reset()
  }

  useEffect(() => getEnderecos({ setData }), [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  const saveSubmit = (data: FormData) => {
    api
      .post('/address', data)
      .then(() => {
        toast.success('Cadastrado com sucesso!')
        getEnderecos({ setData })
        setIsOpen(!isOpen)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response?.data?.error)
      })

    console.log(data)
  }

  const editSubmit = ({ rua, numero, bairro, ponto_de_referencia, cidade, id }: FormData) => {
    console.log({ rua, numero, bairro, ponto_de_referencia, cidade, id })
    api
      .patch('/address', { rua, numero, bairro, ponto_de_referencia, cidade }, { params: { id } })
      .then(() => {
        toast.success('Editado com sucesso!')
        setIsOpen(false)
        reset()
        getEnderecos({ setData })
      })
      .catch((error) => {
        toast.error(error.response?.data?.message)
      })
  }

  const submit = edit ? editSubmit : saveSubmit

  const editItemModal = (data: FormData) => {
    setEdit(true)
    setIsOpen(true)
    setValue('id', data.id)
    setValue('rua', data.rua)
    setValue('numero', data.numero)
    setValue('bairro', data.bairro)
    setValue('ponto_de_referencia', data.ponto_de_referencia)
    setValue('cidade', data.cidade)
  }

  return (
    <Layout>
      <Wrap>
        <Table caption="Endereços" theads={['Rua', 'N°', 'Bairro', 'Ações']} onClick={toggle}>
          {!data.length && (
            <tr>
              <td>Cadastre um endereço...</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}

          {data?.map(({ rua, numero, bairro, id, cidade, ponto_de_referencia }) => (
            <tr key={id}>
              <Std>{rua}</Std>
              <Std>{numero}</Std>
              <Std>{bairro}</Std>
              <Std className="flex gap-2">
                <EditItem onClick={() => editItemModal({ id, rua, numero, bairro, cidade, ponto_de_referencia })}>
                  <Pencil />
                </EditItem>
              </Std>
            </tr>
          ))}
        </Table>
      </Wrap>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Endereço">
        <Sform onSubmit={handleSubmit(submit)}>
          <Input {...register('id')} hidden readOnly />
          <Input placeholder="Rua" {...register('rua')} error={errors.rua?.message} label="Rua" />
          <Input
            typeof="numeric"
            type="number"
            placeholder="Numero"
            {...register('numero')}
            error={errors.numero?.message}
            label="Número"
          />
          <Input placeholder="Bairro" {...register('bairro')} error={errors.bairro?.message} label="Bairro" />
          <Input
            placeholder="Ponto de Referência"
            {...register('ponto_de_referencia')}
            error={errors.ponto_de_referencia?.message}
            label="Ponto de Referência"
          />

          <Input placeholder="Cidade" {...register('cidade')} error={errors.cidade?.message} label="Cidade" />

          <div className="flex justify-end gap-5">
            <Button color="red" type="button" onClick={toggle}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar</Button>
          </div>
        </Sform>
      </Modal>
    </Layout>
  )
}
