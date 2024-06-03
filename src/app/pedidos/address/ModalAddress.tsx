import { FormDataAddress } from '@/app/enderecos/types'
import { useFormAddress } from '@/app/enderecos/useFormAddress'
import { InputForm } from '@/components/ui-componets/input-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { PlusCircle } from 'lucide-react'
import { toast } from 'react-toastify'

export const ModalAddress = ({
  openAddress,
  handleOpenAddress,
}: {
  openAddress: boolean
  handleOpenAddress: () => void
}) => {
  const methods = useFormAddress()

  const { addAddress, getAllAddresses } = useContextAddress()

  const submit = async ({
    rua,
    numero,
    bairro,
    ponto_de_referencia,
    cidade,
    frete_moto,
    frete_carro,
  }: FormDataAddress) => {
    addAddress({
      rua,
      numero: Number(numero),
      bairro,
      ponto_de_referencia,
      cidade,
      frete_moto: Number(frete_moto),
      frete_carro: Number(frete_carro),
    })
      .then(() => {
        toast.success(`${rua} adicionado com sucesso!`)
        getAllAddresses()
        handleOpenAddress()
        methods.reset({})
      })
      .catch((error) => {
        toast.error(error.response.data?.error)
        console.log(error)
      })
  }

  return (
    <Dialog open={openAddress} onOpenChange={handleOpenAddress}>
      <DialogTrigger asChild>
        <Button>
          Adicionar endereço <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-screen overflow-y-scroll rounded-2xl">
        <Form {...methods}>
          <form className="flex flex-col gap-5">
            <InputForm control={methods.control} name="id" readOnly className="hidden" />

            <InputForm control={methods.control} name="rua" placeholder="Rua" label="Rua" showMessageError />

            <InputForm
              control={methods.control}
              name="numero"
              typeof="numeric"
              type="number"
              placeholder="Numero"
              label="Número"
              showMessageError
            />

            <InputForm control={methods.control} name="bairro" placeholder="Bairro" label="Bairro" />

            <InputForm
              control={methods.control}
              name="ponto_de_referencia"
              placeholder="Ponto de Referência"
              label="Ponto de Referência"
              showMessageError
            />

            <InputForm control={methods.control} name="cidade" placeholder="Cidade" label="Cidade" showMessageError />

            <InputForm
              control={methods.control}
              name="frete_moto"
              type="number"
              typeof="numeric"
              label="Frete moto R$"
              min={0}
              step={0.01}
            />
            <InputForm
              control={methods.control}
              name="frete_carro"
              type="number"
              typeof="numeric"
              label="Frete carro R$"
              step={0.01}
              min={0}
            />
            <DialogFooter>
              <Button type="button" onClick={async () => await submit(methods.getValues())}>
                Cadastrar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
