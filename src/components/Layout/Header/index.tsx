'use client'

import { usePathname } from 'next/navigation'
import { Sheader } from './styles'

export default function Header({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()

  return (
    <Sheader>
      {children}
      <h1>{pathName}</h1>
    </Sheader>
  )
}
