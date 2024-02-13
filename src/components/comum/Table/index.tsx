'use client'

import { Button } from '../Button'
import { Scaption, Scontainer, Stable, Sth } from './styles'

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  caption: string
  theads: string[]
  onClickLabel?: string
  onClick?: () => void
}

export default function Table({
  caption,
  onClickLabel = 'Adicionar',
  theads,
  children,
  onClick,
  ...props
}: TableProps) {
  return (
    <Scontainer>
      <Button color="green" onClick={onClick}>
        {onClickLabel}
      </Button>
      <Stable {...props}>
        <Scaption>{caption}</Scaption>

        <thead>
          <tr>{theads?.map((th) => <Sth key={th}>{th}</Sth>)}</tr>
        </thead>

        <tbody className="divide-y">{children}</tbody>
      </Stable>
    </Scontainer>
  )
}
