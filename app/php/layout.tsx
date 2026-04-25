import { phpSections } from '@/lib/sections'
import { LayoutShell } from '@/components/layout/LayoutShell'

export default function PhpLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutShell sections={phpSections} langId="php">
      {children}
    </LayoutShell>
  )
}
