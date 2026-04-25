import { goSections } from '@/lib/sections'
import { LayoutShell } from '@/components/layout/LayoutShell'

export default function GoLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutShell sections={goSections} langId="go">
      {children}
    </LayoutShell>
  )
}
