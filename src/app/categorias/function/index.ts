import { CategoryProps } from '@/app/categorias/page'
import { api } from '@/services/api/apiClient'

interface GetCategoriasProps {
  setData: (data: CategoryProps[]) => void
}
export const getCategorias = ({ setData }: GetCategoriasProps) => {
  api
    .get('/category')
    .then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
