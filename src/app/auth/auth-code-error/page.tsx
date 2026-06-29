import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Link problem' }

export default function AuthCodeErrorPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">This link didn&apos;t work</h1>
      <p className="text-sm text-muted-foreground">
        The link may have expired or already been used. Please request a new one.
      </p>
      <div className="flex gap-3">
        <Link
          href="/login"
          className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-foreground/5"
        >
          Sign in
        </Link>
        <Link
          href="/forgot-password"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Request new link
        </Link>
      </div>
    </main>
  )
}
