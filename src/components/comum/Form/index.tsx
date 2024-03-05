import { Sform } from '@/app/login/styles'

interface FormProps extends React.HTMLProps<HTMLFormElement> {}
export default function Form({ children, ...props }: FormProps) {
  return <Sform {...props}>{children}</Sform>
}
