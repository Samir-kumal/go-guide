import { laravelSections } from '@/lib/sections'
import { LayoutShell } from '@/components/layout/LayoutShell'

export default function LaravelLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutShell sections={laravelSections} langId="laravel">
      {children}
    </LayoutShell>
  )
}
