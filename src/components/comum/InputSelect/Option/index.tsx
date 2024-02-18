import { Soption } from '../styles'
interface OptionProps {
  label: string
  onClick?: () => void
}
export default function Option({ label, onClick }: OptionProps) {
  return (
    <Soption
      onClick={() => {
        onClick()
      }}
    >
      {label}
    </Soption>
  )
}
