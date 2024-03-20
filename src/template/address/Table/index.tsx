import * as T from '@/components/comum/Table/styles'
import Table from '@/components/comum/Table'
import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { TButton } from '@/components/comum/Table/components/TButton'
import { CloseIcon, Pencil } from '@/components/icon'
import { useFormContext } from 'react-hook-form'
import { FormDataAddress } from '@/app/enderecos/types'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { TableTemplateProps } from '@/template/types'

export const TableAddress = ({ openModal }: TableTemplateProps) => {
  const { address, getAllAddresses, removeAddress } = useContextAddress()
  const { setValue, reset } = useFormContext<FormDataAddress>()

  useEffect(() => {
    getAllAddresses()
  }, [])

  const openModalAddress = () => {
    reset()
    openModal()
  }
  return (
    <Table caption="Endereços" onClick={openModalAddress} theads={['Rua', 'N°', 'Bairro', 'Ações']}>
      {!address?.length && (
        <tr>
          <td>Cadastre um endereço...</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )}

      {address?.map(({ rua, numero, bairro, id, cidade, ponto_de_referencia, frete_carro, frete_moto }) => (
        <tr key={id}>
          <T.td>{rua}</T.td>
          <T.td>{numero}</T.td>
          <T.td>{bairro}</T.td>
          <T.tdAction className="flex gap-2">
            <TButton
              type="edit"
              onClick={() => {
                setValue('id', id)
                setValue('rua', rua)
                setValue('numero', numero)
                setValue('bairro', bairro)
                setValue('ponto_de_referencia', ponto_de_referencia)
                setValue('cidade', cidade)
                setValue('frete_carro', frete_carro)
                setValue('frete_moto', frete_moto)
                openModal()
              }}
            >
              <Pencil />
            </TButton>

            <TButton
              type="delete"
              onClick={async () => {
                removeAddress(id)
                  .then(() => {
                    toast.success(`${rua} removido com sucesso!`)
                    getAllAddresses()
                  })
                  .catch((error) => toast.error(error.response.data?.error))
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
