'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Poppins } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { ProvidersContext } from '@/contexts'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <NuqsAdapter>
          <QueryClientProvider client={queryClient}>
            <ProvidersContext>{children}</ProvidersContext>

            <ToastContainer autoClose={300} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
