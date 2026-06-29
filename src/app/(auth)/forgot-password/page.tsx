import Link from 'next/link'
import type { Metadata } from 'next'
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form'
import { Card, CardHeader } from '@/components/ui/card'

export const metadata: Metadata = { title: 'Forgot password' }

export default function ForgotPasswordPage() {
  return (
    <Card>
      <CardHeader
        title="Forgot your password?"
        description="Enter your email and we'll send you a reset link"
      />

      <ForgotPasswordForm />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remembered it?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </Card>
  )
}
