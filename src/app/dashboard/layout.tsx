'use client'
import Header from '@/components/Layout/Header'
import Sidebar from '@/components/Layout/Sidebar'
import { useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {children}

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
