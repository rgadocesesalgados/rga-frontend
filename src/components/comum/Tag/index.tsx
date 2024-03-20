import * as S from './styles'

interface TagProps {
  children: string
  className?: string
  bgColor?: 'yellow' | 'green' | 'red' | 'blue' | 'slate'
}
export const Tag = ({ children, bgColor, className }: TagProps) => {
  return (
    <S.tag className={className} data-bgcolor={bgColor}>
      {children}
    </S.tag>
  )
}
