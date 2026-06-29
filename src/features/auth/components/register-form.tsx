'use client'

import { useActionState } from 'react'
import { registerAction } from '../actions'
import { initialAuthState } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldError, FormMessage } from '@/components/ui/form-message'

export function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, initialAuthState)

  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error ? <FormMessage variant="error">{state.error}</FormMessage> : null}

      <div className="space-y-1.5">
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" name="fullName" type="text" autoComplete="name" required />
        <FieldError messages={state.fieldErrors?.fullName} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
        <FieldError messages={state.fieldErrors?.email} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        <FieldError messages={state.fieldErrors?.password} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
        />
        <FieldError messages={state.fieldErrors?.confirmPassword} />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
