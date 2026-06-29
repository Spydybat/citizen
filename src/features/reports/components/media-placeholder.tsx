import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MediaPlaceholderProps = {
  icon: ReactNode
  title: string
  description: string
  /** Renders taller for the map preview. */
  tall?: boolean
  className?: string
}

/**
 * Non-interactive dashed placeholder standing in for media upload / map
 * features that arrive in a later sprint. Purely presentational.
 */
export function MediaPlaceholder({
  icon,
  title,
  description,
  tall = false,
  className,
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-6 text-center',
        tall && 'py-10',
        className,
      )}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground">
        {icon}
      </span>
      <p className="text-sm font-medium">{title}</p>
      <p className="max-w-xs text-xs text-muted-foreground">{description}</p>
      <span className="mt-1 rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
        Coming soon
      </span>
    </div>
  )
}
