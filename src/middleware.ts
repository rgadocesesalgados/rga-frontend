import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const cookieAuth = cookies().get('nextauth.token')

  if (cookieAuth && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  if (!cookieAuth && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/api/:path*', '/categorias:path*', '/dashboard/:path*', '/forms/:path*', '/login:path*'],
}
