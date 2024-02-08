import { forwardRef } from 'react'
import { Scontainer, SerrorMessage, Sinput, Slabel } from './styles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <Scontainer>
      <Slabel>{label}</Slabel>

      <Sinput {...props} ref={ref} data-error={!!error} />

      {error && <SerrorMessage>{error}</SerrorMessage>}
    </Scontainer>
  )
})

export default Input
