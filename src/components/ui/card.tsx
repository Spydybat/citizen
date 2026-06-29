import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl border border-border bg-background p-6 shadow-sm', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6 space-y-1">
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
  )
}
