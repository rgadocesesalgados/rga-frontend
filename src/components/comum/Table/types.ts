export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  caption: string
  theads: string[]
  onClickLabel?: string
  onClick?: () => void
}
