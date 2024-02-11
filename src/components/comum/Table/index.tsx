'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../Button'
import { Scaption, Scontainer, Stable, Std, Sth } from './styles'
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  caption: string
}

export default function Table({ caption }: TableProps) {
  const router = useRouter()

  const onClick = () => {
    router.push('/forms/categorias')
  }
  return (
    <Scontainer>
      <Button color="green" onClick={onClick}>
        Adicionar nova categoria
      </Button>
      <Stable>
        <Scaption>{caption}</Scaption>

        <thead>
          <tr>
            <Sth>Nome</Sth>
            <Sth>Produtos</Sth>
            <Sth>Ações</Sth>
          </tr>
        </thead>

        <tbody className="divide-y">
          <tr>
            <Std>frios</Std>
            <Std>3</Std>
            <Std className="flex gap-5">
              <PencilSquareIcon className="h-4 w-4" />
              <XMarkIcon className="h-4 w-4" />
            </Std>
          </tr>

          <tr>
            <Std>fritos</Std>
            <Std>12</Std>
          </tr>

          <tr>
            <Std>doces tradicionais</Std>
            <Std>5</Std>
          </tr>
        </tbody>
      </Stable>
    </Scontainer>
  )
}
