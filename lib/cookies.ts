import { cookies } from 'next/headers'

export function setAuthCookie(authSession: string) {
  cookies().set('auth_session', authSession, {
    httpOnly: true,
    maxAge: 2592000, // 30 days in seconds
    path: '/',
    sameSite: 'lax',
    secure: true,
  })
}

export function getAuthSessionFromHeader(setCookieHeader: string | null): string | null {
  if (!setCookieHeader) return null
  return setCookieHeader.match(/auth_session=([^;]+)/)?.[1] || null
}