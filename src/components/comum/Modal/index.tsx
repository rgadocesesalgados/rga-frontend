'use client'

import { CloseIcon } from '@/components/icon'
import { Wrap } from '../Wrap'
import { Sbutton, Scontainer, Scontent, SdivClose, Sheader } from './componentsModal'

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  children?: React.ReactNode
  title: string
}
export default function Modal({ isOpen = true, closeModal, title, children }: ModalProps) {
  return (
    isOpen && (
      <Scontainer data-isopen={isOpen}>
        <SdivClose onClick={closeModal} />
        <Scontent>
          <Wrap>
            <Sheader>
              {title}
              <Sbutton onClick={closeModal}>
                <CloseIcon />
              </Sbutton>
            </Sheader>
            {children}
          </Wrap>
        </Scontent>
      </Scontainer>
    )
  )
}
