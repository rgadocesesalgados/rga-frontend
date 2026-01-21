import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies()
  const cookieAuth = cookieStore.get('nextauth.token')

  if (cookieAuth && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url))
  }
  if (!cookieAuth && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: [
    '/api/:path*',
    '/categorias:path*',
    '/clients/:path*',
    '/dashboard/:path*',
    '/enderecos/:path*',
    '/estoque/:path*',
    '/login:path*',
    '/pedidos/:path*',
    '/produtos/:path*',
    '/',
    '/recheios/:path*',
    '/categorias/:path*',
    '/relatorios/:path*',
    '/organizacao/:path*',
    '/topper/:path*',
    '/financeiro/:path*',
    '/fornecedores/:path*',
  ],
}
