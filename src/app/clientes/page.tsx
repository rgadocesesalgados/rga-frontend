'use client'
import { Wrap } from '@/components/comum/Wrap'
import Layout from '../dashboard/layout'
import { states } from './statates'
import Modal from '@/components/comum/Modal/Index'
import Table from '@/components/comum/Table'
import { forms } from './forms'
import { FormDataCliente } from './types'
import { Sform } from '../login/styles'
import Input from '@/components/comum/Input'
import { Button } from '@/components/comum/Button'
import { getEnderecos } from '../enderecos/functions'
import { InputSelect } from '@/components/comum/InputSelect'
import { api } from '@/services/api/apiClient'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { Std } from '@/components/comum/Table/styles'
import { DeleteItem, EditItem } from '@/components/comum/Table/tableActions'
import { CloseIcon, Pencil } from '@/components/icon'
import { getClientes } from './function'
import { SconatainerOption } from '@/components/comum/InputSelect/styles'
import Option from '@/components/comum/InputSelect/Option'

export default function Clientes() {
  const { isOpen, setIsOpen, edit, setEdit, dataAddress, setDataAddress, data, setData, openOption, setOpenOption } =
    states()
  const { register, handleSubmit, reset, setValue, errors, watch } = forms()

  useEffect(() => getClientes({ setData }), [])

  const convertAddress = () => {
    const data = dataAddress.map((item) => ({
      label: `${item.rua} - ${item.numero}, ${item.bairro}, ${item.cidade} `,
      value: `${item.id}`,
    }))
    return data
  }

  const toggle = () => {
    setIsOpen(!isOpen)
    getEnderecos({ setData: setDataAddress })
    reset()
  }

  const openModalEdit = ({ id, name, tel, address_id }: FormDataCliente) => {
    setValue('id', id)
    setValue('name', name)
    setValue('tel', tel)
    setValue('address_id', address_id)
    const findAddress = dataAddress.find(({ id }) => id == address_id)
    setValue(
      'inputSearch',
      `${findAddress?.rua} - ${findAddress?.numero}, ${findAddress?.bairro}, ${findAddress?.cidade}`,
    )

    getEnderecos({ setData: setDataAddress })
    setIsOpen(true)
    setEdit(true)
  }

  const editSubmit = (data: FormDataCliente) => {
    console.log('edit: ', data)
  }

  const saveSubmit = (data: FormDataCliente) => {
    api
      .post(
        '/client',
        {
          name: data.name,
          tel: data.tel,
        },
        { params: { address_id: data.address_id } },
      )
      .then((response) => {
        toast.success(`${response.data?.name} Cadastrado com sucesso!`)
        getClientes({ setData })
        setIsOpen(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response?.data?.error)
      })
    console.log('save: ', data)
  }

  const submit = edit ? editSubmit : saveSubmit
  return (
    <Layout>
      <Wrap>
        <Table caption="Clientes" onClick={toggle} theads={['Nome', 'Telefone', 'Ações']}>
          {data?.map(({ name, id, tel, address_id, inputSearch }) => (
            <tr key={id}>
              <Std>{name}</Std>
              <Std>{tel}</Std>

              <Std className="flex gap-2">
                <EditItem onClick={() => openModalEdit({ id, name, tel, address_id, inputSearch })}>
                  <Pencil />
                </EditItem>
                <DeleteItem>
                  <CloseIcon />
                </DeleteItem>
              </Std>
            </tr>
          ))}
        </Table>
      </Wrap>

      <Modal isOpen={isOpen} setIsOpen={toggle} title="Cliente">
        <Sform onSubmit={handleSubmit(submit)}>
          <Input type="text" {...register('id')} error={errors.name?.message} hidden />

          <Input type="text" label="Nome" placeholder="Nome" {...register('name')} error={errors.name?.message} />

          <Input type="text" label="Telefone" placeholder="Telefone" {...register('tel')} error={errors.tel?.message} />

          <InputSelect data={convertAddress()} label="Bucar endereço" {...register('address_id')}>
            <Input
              type="search"
              label="Bucar endereço"
              {...register('inputSearch')}
              autoComplete="none"
              onClick={() => setOpenOption(true)}
            />

            <SconatainerOption data-open={openOption}>
              {dataAddress
                .map(({ id, rua, numero, bairro, cidade }) => {
                  return {
                    label: `${rua} - ${numero}, ${bairro}, ${cidade}`,
                    value: `${id}`,
                  }
                })
                .filter(({ label }) => {
                  const labelNormalized = label?.toUpperCase().replace(' ', '')
                  const inputSearchNormalized = watch('inputSearch')?.toUpperCase().replace(' ', '')

                  return labelNormalized.match(inputSearchNormalized)
                })
                .map(({ label, value }) => (
                  <Option
                    key={value}
                    label={label}
                    onClick={() => {
                      setValue('address_id', value)
                      setValue('inputSearch', label)
                      setOpenOption(false)
                    }}
                  />
                ))}
            </SconatainerOption>
          </InputSelect>

          <div className="flex justify-end gap-2">
            <Button type="button" color="red" onClick={toggle}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </Sform>
      </Modal>
    </Layout>
  )
}
