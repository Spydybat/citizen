import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { siteConfig } from '@/config/site'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-6 block text-center text-lg font-semibold tracking-tight">
          {siteConfig.shortName}
        </Link>
        {children}
      </div>
    </div>
  )
}
