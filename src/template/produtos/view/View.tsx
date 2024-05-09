import { toBRL } from '@/app/utils/toBRL'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useContextProduct } from '@/contexts/dataContexts/productsContext/useContextProduct'
import { useView } from '@/contexts/view'
import { Images } from 'lucide-react'

export const View = () => {
  const { id, open, handleOpen, setId } = useView()
  const { products } = useContextProduct()

  const product = products?.find((product) => product.id === id)

  if (!product) return null

  const { name, banner, category_name, price, min_quantity } = product

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
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        {banner && <img src={banner} alt={name} className="w-full rounded-xl" />}

        {!banner && (
          <div className="flex items-center justify-center rounded-xl border py-10 ">
            <Images className="h-20 w-20 text-gray-500" />
          </div>
        )}

        <p>Categoria: {category_name}</p>

        <p>Preço: {toBRL(price)}</p>

        <p>Quantidade mínima: {min_quantity}</p>
      </DialogContent>
    </Dialog>
  )
}
