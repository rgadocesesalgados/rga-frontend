'use client'

import Input from '@/components/comum/Input'
import { Sform, Stitle } from './styles'
import { Button } from '@/components/comum/Button'
import zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/contexts/Authcontext'

export default function Login() {
  const scheme = zod.object({
    tel: zod
      .string()
      .min(11, 'O telefone deve conter DDD e o digito 9.')
      .max(11, 'O telefone deve conter DDD e o digito 9.'),
    password: zod.string().min(4, 'A sua senha deve ter pelo menos 4 caracteres.'),
  })

  type FormData = zod.infer<typeof scheme>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(scheme),
  })

  const { signIn } = useAuth()

  const handleLogin = async (data: FormData) => {
    await signIn(data)
  }
  return (
    <>
      <Sform onSubmit={handleSubmit(handleLogin)}>
        <Stitle className="mb-5">Login</Stitle>

        <Input label="Telefone" {...register('tel')} error={errors.tel?.message} />

        <Input
          label="Senha"
          type="password"
          typeof="numeric"
          {...register('password')}
          error={errors.password?.message}
        />

        <Button className="w-full" type="submit">
          Entrar
        </Button>
      </Sform>
    </>
  )
}
