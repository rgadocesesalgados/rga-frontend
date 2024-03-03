export interface TButtonProps {
  label?: string
  children?: React.ReactNode
  type?: 'edit' | 'delete'
  onClick?: () => void
}
