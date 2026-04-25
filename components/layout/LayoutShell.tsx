'use client'
import { useMemo, useState } from 'react'
import { sections } from '@/lib/sections'
import { useSidebarScroll } from '@/hooks/useSidebarScroll'
import { Sidebar } from './Sidebar'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sectionIds = useMemo(() => sections.map((s) => s.id), [])
  const { activeSection, progress } = useSidebarScroll(sectionIds)

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 bg-[#1a1a2e] text-white p-4 flex justify-between items-center z-[80] shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐹</span>
          <span className="font-bold tracking-tight">Go Guide</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="bg-transparent border border-white/30 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer hover:bg-white/10"
        >
          Menu
        </button>
      </header>

      <Sidebar 
        sections={sections} 
        activeSection={activeSection} 
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
