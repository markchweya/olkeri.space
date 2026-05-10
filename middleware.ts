import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const url = request.nextUrl.clone()

  if (host.startsWith('dashboard.') && !url.pathname.startsWith('/dashboard')) {
    url.pathname = `/dashboard${url.pathname === '/' ? '' : url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|assets|.*\\..*).*)'],
}
