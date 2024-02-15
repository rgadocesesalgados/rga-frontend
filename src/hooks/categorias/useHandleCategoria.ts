import { CategoryProps } from '@/app/categorias/page'
import { api } from '@/services/api/apiClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import zod from 'zod'

let idName = ''
export const useHandleCategorias = () => {
  const schema = zod.object({
    name: zod.string().min(4, 'A categoria deve ter pelo menos 4 caracteres.'),
  })
  type FormData = zod.infer<typeof schema>
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const getCategorias = () => {
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

  const [data, setData] = useState<CategoryProps[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [edit, setEdit] = useState(false)

  useEffect(getCategorias, [])
  const toogleModal = () => {
    setEdit(false)
    setIsOpen(!isOpen)
  }

  const deleteCategory = async (name: string) => {
    await api
      .delete('/category', { params: { name } })
      .then(() => {
        toast.success(` ${name} deletado com sucesso!`)
        getCategorias()
      })
      .catch((error) => {
        toast.warn(error.response.data?.error)
      })
  }

  const saveSubmit = async (data: FormData) => {
    await api
      .post('/category', data)
      .then(() => {
        toast.success('Cadastrado com sucesso!')
        setIsOpen(!isOpen)
        getCategorias()
        reset()
      })
      .catch((error) => {
        console.log(error)
        toast.warn(error.response.data?.error)
      })
  }

  const editSubmit = async (data: FormData) => {
    await api
      .patch('/category', { new_name: data.name }, { params: { name: idName } })
      .then(() => {
        toast.success('Editado com sucesso!')
        setIsOpen(!isOpen)
        getCategorias()
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

  const submit = edit ? editSubmit : saveSubmit

  return {
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
    reset,
    edit,
  }
}
