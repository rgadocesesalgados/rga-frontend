'use client'

import { usePathname } from 'next/navigation'
import { Sheader, SmenuBars } from './styles'
import ButtonToggle from '../Buttontoggle'

export interface HeaderProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}
export default function Header({ isOpen, setIsOpen }: HeaderProps) {
  const pathName = usePathname()

  return (
    <Sheader>
      <ButtonToggle isOpen={isOpen} setIsOpen={setIsOpen} icon={<SmenuBars />} />
      <h1>{pathName}</h1>
    </Sheader>
  )
}
