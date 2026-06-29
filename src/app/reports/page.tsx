import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { AppHeader } from '@/components/layout/app-header'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = { title: 'My Reports' }

export default async function ReportsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // "My Reports" is personal to the signed-in user; guard it server-side.
  if (!user) redirect('/login')

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">My Reports</h1>
          <Link
            href="/reports/new"
            className="inline-flex text-sm font-medium text-primary hover:underline"
          >
            Create report →
          </Link>
        </div>

        <Card>
          <h2 className="text-base font-medium">No reports yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The list of your submitted reports will appear here. For now, you can{' '}
            <Link href="/reports/new" className="font-medium text-primary hover:underline">
              create your first report
            </Link>
            .
          </p>
        </Card>
      </main>
    </>
  )
}
