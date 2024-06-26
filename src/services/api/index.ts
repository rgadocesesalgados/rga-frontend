import axios, { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import { AuthTokenError } from '../errors/AuthTokenError'
import { signOut } from '@/contexts/Authcontext'

export const setupApiClient = () => {
  const cookies = Cookie.get('nextauth.token')

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: cookies ? `Bearer ${cookies} ` : '',
    },
  })

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (window !== undefined) {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      return Promise.reject(error)
    },
  )

  return api
}
