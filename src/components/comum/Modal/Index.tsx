'use client'

import { CloseIcon } from '@/components/icon'
import { Wrap } from '../Wrap'
import { Sbutton, Scontainer, Scontent, SdivClose, Sheader } from './componentsModal'

interface ModalProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  children?: React.ReactNode
  title: string
}
export default function Modal({ isOpen = true, setIsOpen, title, children }: ModalProps) {
  const toggle = () => setIsOpen(!isOpen)
  return (
    <Scontainer data-isopen={isOpen}>
      <SdivClose onClick={toggle} />
      <Scontent>
        <Wrap>
          <Sheader>
            {title}
            <Sbutton onClick={toggle}>
              <CloseIcon />
            </Sbutton>
          </Sheader>
          {children}
        </Wrap>
      </Scontent>
    </Scontainer>
  )
}
