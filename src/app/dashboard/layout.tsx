'use client'
import Header from '@/components/Layout/Header'
import Sidebar from '@/components/Layout/Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header>
        <Sidebar />
      </Header>
      {children}
    </div>
  )
}
