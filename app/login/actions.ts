"use server"

import { setAuthCookie, getAuthSessionFromHeader } from '@/lib/cookies'

export async function loginAction(formData: { email: string; password: string }) {
  const response = await fetch('http://127.0.0.1:8787/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (response.ok) {
    const setCookieHeader = response.headers.get('Set-Cookie')
    const authSession = getAuthSessionFromHeader(setCookieHeader)
    
    if (!authSession) {
      return { error: 'Login failed' }
    }

    setAuthCookie(authSession)
    return { success: true }
  } else {
    const errorData = await response.json()
    return { error: errorData.error || 'Login failed' }
  }
}