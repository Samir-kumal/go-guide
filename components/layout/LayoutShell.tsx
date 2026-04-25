'use client'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SectionEntry } from '@/lib/sections'
import { useSidebarScroll } from '@/hooks/useSidebarScroll'
import { Sidebar } from './Sidebar'
import { getLanguage } from '@/lib/languages'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
  sections: SectionEntry[]
  langId: string
}

export function LayoutShell({ children, sections, langId }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const lang = getLanguage(langId)

  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])
  const { activeSection, progress } = useSidebarScroll(sectionIds)

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 bg-[#1a1a2e] text-white p-4 flex justify-between items-center z-[80] shadow-md">
        <Link href="/" className="flex items-center gap-2 no-underline text-white">
          <span className="text-xl">{lang?.icon || '📚'}</span>
          <span className="font-bold tracking-tight">{lang?.name || 'Guide'}</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="bg-transparent border border-white/30 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer hover:bg-white/10"
        >
          Menu
        </button>
      </header>

      <Sidebar 
        sections={sections} 
        activeSection={activeSection || `#${pathname.split('/').pop()}`} 
        progress={progress} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="md:ml-[calc(var(--sidebar-w)+20px)] max-w-[900px] px-6 md:px-10 py-10">
        {children}
      </main>
    </>
  )
}
