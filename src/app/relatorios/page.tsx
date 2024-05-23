'use client'
import { Bolos } from '@/template/relatorios/bolos'
import Layout from '../dashboard/layout'
import { Wrap } from '@/components/comum/Wrap'
import { Toppers } from '@/template/relatorios/topper'
import { useRelatorios } from '@/contexts/relatorios'
import { useEffect } from 'react'
import { Produtos } from '@/template/relatorios/produtos/Produtos'

export default function Relatorios() {
  const { getRelatorios, relatorios } = useRelatorios()

  useEffect(() => {
    getRelatorios()
  })
  return (
    <Layout>
      <Wrap className="space-y-10">
        <Bolos data={relatorios?.bolos} />

        <Toppers data={relatorios?.toppers} />

        <Produtos data={relatorios?.produtos} />
      </Wrap>
    </Layout>
  )
}
