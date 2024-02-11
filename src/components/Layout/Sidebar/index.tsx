import { configSidebarlinks } from '@/config-components/links/sidebar'
import ButtonToggle from '../Buttontoggle'
import { Saside, SiconClose } from './styles'
import NavLink from '../NavLink'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <Saside data-isopen={isOpen}>
      <ButtonToggle className="border-black" icon={<SiconClose />} isOpen={isOpen} setIsOpen={setIsOpen} />

      {configSidebarlinks.map((link) => (
        <NavLink key={link.href} href={link.href} label={link.label} />
      ))}
    </Saside>
  )
}
