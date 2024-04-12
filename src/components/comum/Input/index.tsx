import { forwardRef, useId } from 'react'
import { Scontainer, SerrorMessage, Sinput } from './styles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, type, className, ...props }, ref) => {
  const id = useId()
  return (
    <Scontainer data-type={type} className={className}>
      {label && (
        <label htmlFor={id} data-type={type}>
          {label}
        </label>
      )}
      <Sinput {...props} id={id} type={type} data-type={type} ref={ref} data-error={!!error} />
      {error && <SerrorMessage>{error}</SerrorMessage>}
    </Scontainer>
  )
})

export default Input
