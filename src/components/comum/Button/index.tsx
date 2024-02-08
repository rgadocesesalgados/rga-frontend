import { Sbutton } from './styles'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'outline' | 'green' | 'blue' | 'red'
}

export const Button = ({ children, color, ...props }: ButtonProps) => {
  return (
    <Sbutton {...props} data-color={color}>
      {children}
    </Sbutton>
  )
}
