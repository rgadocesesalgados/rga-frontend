import * as S from './styles'
import { THeadProps } from './types'

export const THead = ({ theads }: THeadProps) => (
  <thead>
    <tr>{theads?.map((th) => <S.th key={th}>{th}</S.th>)}</tr>
  </thead>
)
