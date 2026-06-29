'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { env } from '@/lib/env'
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from './schema'
import type { AuthActionState } from './types'

/** Only allow same-origin relative redirects to avoid open-redirect abuse. */
function safeNext(value: FormDataEntryValue | null, fallback: string): string {
  const v = typeof value === 'string' ? value : ''
  return v.startsWith('/') && !v.startsWith('//') ? v : fallback
}

export async function loginAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
  })
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)
  if (error) {
    return { error: 'Invalid email or password.' }
  }

  redirect(safeNext(formData.get('redirectTo'), '/dashboard'))
}

export async function registerAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    fullName: String(formData.get('fullName') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
    confirmPassword: String(formData.get('confirmPassword') ?? ''),
  })
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName },
      emailRedirectTo: `${env.siteUrl}/auth/confirm`,
    },
  })
  if (error) {
    return { error: error.message }
  }

  // If email confirmation is OFF, a session is returned immediately.
  if (data.session) {
    redirect('/dashboard')
  }
  redirect(`/verify-email?email=${encodeURIComponent(parsed.data.email)}`)
}

export async function forgotPasswordAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: String(formData.get('email') ?? ''),
  })
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${env.siteUrl}/auth/confirm?next=/reset-password`,
  })
  if (error) {
    return { error: error.message }
  }

  // Deliberately generic to avoid leaking which emails are registered.
  return {
    success: 'If an account exists for that email, a password reset link is on its way.',
  }
}

export async function resetPasswordAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = resetPasswordSchema.safeParse({
    password: String(formData.get('password') ?? ''),
    confirmPassword: String(formData.get('confirmPassword') ?? ''),
  })
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Your reset link is invalid or has expired. Request a new one.' }
  }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password })
  if (error) {
    return { error: error.message }
  }

  redirect('/login?reset=success')
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
