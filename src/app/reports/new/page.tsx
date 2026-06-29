import type { Metadata } from 'next'
import { CreateReportForm } from '@/features/reports/components/create-report-form'
import { AppHeader } from '@/components/layout/app-header'
import { Card, CardHeader } from '@/components/ui/card'

export const metadata: Metadata = { title: 'Create report' }

export default function CreateReportPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl p-4 sm:p-6">
        <Card>
          <CardHeader
            title="Create a report"
            description="Tell us what's happening. The more detail you provide, the faster it can be addressed."
          />
          <CreateReportForm />
        </Card>
      </main>
    </>
  )
}
