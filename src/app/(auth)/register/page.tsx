import Link from 'next/link'
import type { Metadata } from 'next'
import { RegisterForm } from '@/features/auth/components/register-form'
import { Card, CardHeader } from '@/components/ui/card'

export const metadata: Metadata = { title: 'Create account' }

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader title="Create your account" description="Join to report and track civic issues" />

      <RegisterForm />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  )
}
