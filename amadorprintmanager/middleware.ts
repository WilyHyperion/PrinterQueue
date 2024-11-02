
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 import { auth } from '@/auth'
export async function middleware(request: NextRequest) {
    const cookies = request.cookies;
    if (cookies.get('authjs.session-token')) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login', request.nextUrl))
}
export const config = {
  matcher: '/logged/(.*)',
}