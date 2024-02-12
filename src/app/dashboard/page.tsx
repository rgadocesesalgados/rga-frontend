'use client'
import { useAuth } from '@/contexts/Authcontext'

export default function Dashboard() {
  const user = useAuth()
  return (
    <div>
      <h1>Olá, mundo! {user.user?.name}</h1>
    </div>
  )
}
