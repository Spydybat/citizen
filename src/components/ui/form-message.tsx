import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function FormMessage({
  variant = 'error',
  children,
  className,
}: {
  variant?: 'error' | 'success'
  children: ReactNode
  className?: string
}) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'rounded-md border px-3 py-2 text-sm',
        variant === 'error'
          ? 'border-destructive/30 bg-destructive/10 text-destructive'
          : 'border-green-600/30 bg-green-600/10 text-green-700 dark:text-green-400',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function FieldError({ messages }: { messages?: string[] }) {
  if (!messages || messages.length === 0) return null
  return <p className="text-xs text-destructive">{messages[0]}</p>
}
