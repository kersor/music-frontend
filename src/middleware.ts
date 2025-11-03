import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { api } from './lib/axios'
import { ListPagesConfig } from './config/pages'

export async function middleware(req: NextRequest) {
    const pathName = req.nextUrl.pathname
    const isAuth = req.cookies.get('access_token')?.value

    // Страницы для авториз пол-ей
    const authPages = [
      ListPagesConfig.PROFILE_PERSONAL.href
    ]

    if (isAuth !== undefined && pathName === ListPagesConfig.AUTH.href) {
        const url = req.nextUrl.clone()
 
        url.pathname = '/'
        url.search = ''

        return NextResponse.redirect(url)
    }

    if (isAuth !== undefined && pathName === ListPagesConfig.LOGOUT.href) {
        const url = req.nextUrl.clone()
        url.pathname = '/'
        url.search = ''

        // Удаляем куку через Set-Cookie
        const res = NextResponse.redirect(url)
        res.cookies.set('access_token', '', { path: '/', maxAge: 0 })
        res.cookies.set('refresh_token', '', { path: '/api/auth/refresh', maxAge: 0 })

        return res
    }

    
    if (isAuth === undefined && authPages.includes(pathName)) {
        const url = req.nextUrl.clone()
        url.pathname = '/404'
        url.search = ''
        return NextResponse.rewrite(url)
    }

    return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
