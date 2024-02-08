import { usePathname } from 'next/navigation'
import { Slink } from './styles'

export interface NavLinkProps {
  href: string
  children?: React.ReactNode
  label?: string
}

export default function NavLink({ children, href, label }: NavLinkProps) {
  const pathname = usePathname()
  return (
    <Slink href={href} data-pathname={href === pathname}>
      {children}
      {label}
    </Slink>
  )
}
