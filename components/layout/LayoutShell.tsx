'use client'
import { useMemo } from 'react'
import { sections } from '@/lib/sections'
import { useSidebarScroll } from '@/hooks/useSidebarScroll'
import { Sidebar } from './Sidebar'
import { ActiveIndicator } from './ActiveIndicator'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const sectionIds = useMemo(() => sections.map((s) => s.id), [])
  const { activeSection, progress } = useSidebarScroll(sectionIds)

  return (
    <>
      <Sidebar sections={sections} activeSection={activeSection} progress={progress} />
      <ActiveIndicator activeSection={activeSection} sections={sections} />
      <main className="md:ml-[calc(var(--sidebar-w)+20px)] max-w-[900px] px-10 py-10">
        {children}
      </main>
    </>
  )
}
