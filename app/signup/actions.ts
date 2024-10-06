"use server"

import { cookies } from 'next/headers'

export async function signupAction(formData: { email: string; password: string }) {
  const response = await fetch('http://127.0.0.1:8787/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (response.ok) {
    const setCookieHeader = response.headers.get('Set-Cookie')
    if (setCookieHeader) {
      cookies().set(setCookieHeader)
    }
    return { success: true }
  } else {
    const errorData = await response.json()
    return { error: errorData.error || 'Sign up failed' }
  }
}