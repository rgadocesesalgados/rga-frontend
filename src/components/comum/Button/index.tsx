import { Sbutton } from './styles'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'outline' | 'green' | 'blue' | 'red' | 'dash'
}

export const Button = ({ children, color, type = 'button', ...props }: ButtonProps) => {
  return (
    <Sbutton {...props} type={type} data-color={color}>
      {children}
    </Sbutton>
  )
}
