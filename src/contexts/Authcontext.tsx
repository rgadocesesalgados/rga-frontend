'use client'
import { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { api } from '@/services/api/apiClient'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface AuthContextData {
  user: UserProps | null
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
}

export interface UserProps {
  id: string
  name: string
  tel: string
}
const AuthContext = createContext({} as AuthContextData)

interface SignInProps {
  tel: string
  password: string
}

export const signOut = () => {
  try {
    Cookies.remove('@nextauth.token')
    Router.push('/')
  } catch (error) {
    console.log('erro ao deslogar', error)
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<UserProps | null>(null)
  const isAuthenticated = !!user
  const signIn = async ({ tel, password }: SignInProps) => {
    try {
      const response = await api.post('/auth', { tel, password })

      const { token, id, name } = response.data

      Cookies.set('nextauth.token', token, {
        path: '/',
        expires: 60 * 60 * 24 * 30 * 12, // 12 months
      })

      setUser({ id, name, tel })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      router.push('/dashboard')
      toast.success('Login efetuado com sucesso!')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.error)
      }

      console.log('Erro ao logar: ', error)
    }
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  return context
}
