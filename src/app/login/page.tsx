'use client'

import Input from '@/components/comum/Input'
import { Sform, Stitle } from './styles'
import { Button } from '@/components/comum/Button'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push('/dashboard')
  }
  return (
    <>
      <Sform onSubmit={handleLogin}>
        <Stitle className="mb-5">Login</Stitle>

        <Input label="Telefone" />

        <Input label="Senha" type="password" typeof="numeric" />

        <Button className="w-full" type="submit">
          Entrar
        </Button>
      </Sform>
    </>
  )
}
