'use client'

import { useActionState } from 'react'
import { loginAction } from '../actions'
import { initialAuthState } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldError, FormMessage } from '@/components/ui/form-message'

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, action, isPending] = useActionState(loginAction, initialAuthState)

  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error ? <FormMessage variant="error">{state.error}</FormMessage> : null}

      {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
        <FieldError messages={state.fieldErrors?.email} />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="/forgot-password" className="text-xs text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <FieldError messages={state.fieldErrors?.password} />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
