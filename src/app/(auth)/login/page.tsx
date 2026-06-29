import Link from 'next/link'
import type { Metadata } from 'next'
import { LoginForm } from '@/features/auth/components/login-form'
import { Card, CardHeader } from '@/components/ui/card'
import { FormMessage } from '@/components/ui/form-message'

export const metadata: Metadata = { title: 'Sign in' }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string; redirectTo?: string }>
}) {
  const sp = await searchParams
  const redirectTo = typeof sp.redirectTo === 'string' ? sp.redirectTo : undefined

  return (
    <Card>
      <CardHeader title="Welcome back" description="Sign in to your account" />

      {sp.reset === 'success' ? (
        <div className="mb-4">
          <FormMessage variant="success">
            Your password has been updated. Sign in with your new password.
          </FormMessage>
        </div>
      ) : null}

      <LoginForm redirectTo={redirectTo} />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Create one
        </Link>
      </p>
    </Card>
  )
}
