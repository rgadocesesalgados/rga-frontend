import { Sbutton } from './styles'

export interface ButtonToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function ButtonToggle({ icon, isOpen, setIsOpen, ...props }: ButtonToggleProps) {
  return (
    <Sbutton onClick={() => setIsOpen(!isOpen)} {...props}>
      {icon}
    </Sbutton>
  )
}
