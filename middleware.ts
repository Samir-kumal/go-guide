import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, hash } = request.nextUrl

  if (pathname === '/' && hash) {
    const url = request.nextUrl.clone()
    url.pathname = `/go/${hash.slice(1)}`
    url.hash = ''
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}