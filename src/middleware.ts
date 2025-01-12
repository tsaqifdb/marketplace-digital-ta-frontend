import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const publicPaths = ['/auth/login', '/auth/register']
    
    // Jika user mengakses halaman publik dan sudah login, redirect ke dashboard
    if (token && publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Jika user belum login dan mengakses halaman protected, redirect ke login
    if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next()
}

// Konfigurasi path mana saja yang akan diproteksi
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/auth/:path*'
    ]
}