import { Soption } from '../styles'
interface OptionProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string
  onClick?: () => void
}

export default function ({ label, ...props }: OptionProps) {
  return (
    <Soption type="button" {...props}>
      {label}
    </Soption>
  )
}
