import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { env } from '@/lib/env'

type CookieToSet = { name: string; value: string; options?: CookieOptions }

/** Routes that require an authenticated user. */
const PROTECTED_PREFIXES = ['/dashboard', '/profile']

/** Auth pages an already-signed-in user should be bounced away from. */
const AUTH_ROUTES = ['/login', '/register', '/forgot-password']

/**
 * Refreshes the Supabase auth session on every request and enforces route
 * protection. Must run in middleware so the session cookie stays current.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
      },
    },
  })

  // IMPORTANT: do not run logic between createServerClient and getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isProtected = PROTECTED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))
  const isAuthRoute = AUTH_ROUTES.includes(path)

  // Carry the refreshed auth cookies onto any redirect we issue.
  const redirectTo = (pathname: string, search?: Record<string, string>) => {
    const url = request.nextUrl.clone()
    url.pathname = pathname
    url.search = ''
    if (search) Object.entries(search).forEach(([k, v]) => url.searchParams.set(k, v))
    const response = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach((cookie) => response.cookies.set(cookie))
    return response
  }

  if (isProtected && !user) {
    return redirectTo('/login', { redirectTo: path })
  }

  if (isAuthRoute && user) {
    return redirectTo('/dashboard')
  }

  return supabaseResponse
}
