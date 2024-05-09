import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import { useContextAddress } from '@/contexts/dataContexts/addressContext/useContextAddress'
import { useView } from '@/contexts/view'

export const View = () => {
  const { address } = useContextAddress()

  const { id, open, handleOpen, setId } = useView()

  const addressSelected = address.find((address) => address.id === id)
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        handleOpen()
        setId('')
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{addressSelected?.rua}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Rua</TableHead> <TableCell>{addressSelected?.rua}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>N°</TableHead> <TableCell>{addressSelected?.numero}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Bairro</TableHead> <TableCell>{addressSelected?.bairro}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Ponto de referência</TableHead> <TableCell>{addressSelected?.ponto_de_referencia}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Cidade</TableHead> <TableCell>{addressSelected?.cidade}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
