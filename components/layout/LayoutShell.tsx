'use client'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SectionEntry } from '@/lib/sections'
import { useSidebarScroll } from '@/hooks/useSidebarScroll'
import { Sidebar } from './Sidebar'
import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'
import { GoPlayground, PlaygroundButton } from '@/components/ui'

interface Props {
  children: React.ReactNode
  sections: SectionEntry[]
  langId: string
}

export function LayoutShell({ children, sections }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false)
  const pathname = usePathname()

  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])
  const { activeSection, progress } = useSidebarScroll(sectionIds)
  const showPlayground = pathname === '/go' || pathname.startsWith('/go/')

  return (
    <div className="min-h-screen bg-[var(--bg-page)] transition-colors duration-300">
      {/* Top Navigation Bar
          Mobile : px-4, logo text hidden on xs to save space
          Tablet+: px-6
          Desktop: px-8, section nav links visible at xl
      */}
      <header className="fixed top-0 left-0 right-0 h-[var(--nav-h)] bg-[var(--bg-sidebar)] dark:bg-[#0f172a] border-b border-slate-200/60 dark:border-[#1e293b] flex items-center justify-between px-4 sm:px-6 md:px-8 z-[100] transition-colors duration-300 shadow-sm shadow-indigo-500/5">
        <div className="flex items-center gap-3 lg:gap-10">
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-indigo-500/30 group-hover:scale-105 transition-transform shrink-0">
              G
            </div>
            {/* Hide text on very small screens to avoid header overflow */}
            <span className="hidden xs:inline font-black tracking-tight text-[var(--text-primary)] text-xl">GoCode</span>
          </Link>

          <nav className="hidden xl:flex items-center gap-8">
            <Link href="#quick-comparison" className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline">Quick Comparison</Link>
            <Link href="#code-breakdown" className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline">Code Breakdown</Link>
            <Link href="#deep-dive" className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline">Deep Dive</Link>
            <Link href="#literals-types" className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline">Literals & Types</Link>
          </nav>
        </div>

        {/* shrink-0 prevents the right controls from being compressed by a wide logo/nav on small screens */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {/* 44px min tap target on mobile */}
          <button className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors bg-transparent border-none cursor-pointer rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <ThemeToggle />

          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation"
            className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors bg-transparent border-none cursor-pointer rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex pt-[var(--nav-h)]">
        <Sidebar
          sections={sections}
          activeSection={activeSection || `#${pathname.split('/').pop()}`}
          progress={progress}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Content area
            Mobile : full-width, px-4 — no sidebar margin
            Tablet : px-6
            Desktop: sidebar offset, px-8 → px-16
        */}
        <main className="flex-1 lg:ml-[var(--sidebar-w)] min-w-0">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 py-8 sm:py-12 lg:py-16">
            {children}
          </div>
        </main>
      </div>

      {showPlayground && (
        <PlaygroundButton onClick={() => setIsPlaygroundOpen(true)} />
      )}

      <GoPlayground
        isOpen={isPlaygroundOpen}
        onClose={() => setIsPlaygroundOpen(false)}
      />
    </div>
  )
}
