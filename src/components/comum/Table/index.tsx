'use client'

import * as S from './styles'
import { Button } from '../Button'
import { THead } from './components/THead'
import { TableProps } from './types'

export default function Table({
  caption,
  onClickLabel = 'Adicionar',
  theads,
  children,
  onClick,
  ...props
}: TableProps) {
  return (
    <S.container>
      <Button color="green" onClick={onClick}>
        {onClickLabel}
      </Button>

      <S.table {...props}>
        <S.caption>{caption}</S.caption>

        <THead theads={theads} />

        <S.tbory>{children}</S.tbory>
      </S.table>
    </S.container>
  )
}
