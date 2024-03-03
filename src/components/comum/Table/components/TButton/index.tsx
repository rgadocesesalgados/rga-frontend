import * as S from './styles'
import { TButtonProps } from './types'

export const TButton = ({ label, children, type, onClick }: TButtonProps) => {
  return (
    <S.button data-type={type} onClick={onClick}>
      {!!label && label}
      {!!children && children}
    </S.button>
  )
}
