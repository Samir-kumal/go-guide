'use client'
import { useRef, useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SectionEntry } from '@/lib/sections'

interface Props {
  sections: SectionEntry[]
  activeSection: string
  progress: number
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ sections, activeSection, progress, isOpen, onClose }: Props) {
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 })
  const navRef = useRef<HTMLUListElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const activeId = activeSection.startsWith('#') ? activeSection.slice(1) : activeSection
    const activeLink = navRef.current?.querySelector(`a[href$="#${activeId}"]`)
    
    if (activeLink) {
      const parentRect = navRef.current?.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()

      if (parentRect) {
        setIndicatorStyle({
          top: linkRect.top - parentRect.top,
          height: linkRect.height,
          opacity: 1,
        })
      }
    } else {
      setIndicatorStyle((s) => ({ ...s, opacity: 0 }))
    }
  }, [activeSection, sections])

  const groupedSections = useMemo(() => {
    const groups: { [key: string]: SectionEntry[] } = {}
    sections.forEach(s => {
      const g = s.group || 'General'
      if (!groups[g]) groups[g] = []
      groups[g].push(s)
    })
    return groups
  }, [sections])

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] lg:hidden" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav 
        className={`fixed left-0 top-[var(--nav-h)] w-[var(--sidebar-w)] h-[calc(100vh-var(--nav-h))] bg-[var(--bg-sidebar)] dark:bg-[#0f172a] border-r border-slate-200/60 dark:border-[#1e293b] overflow-y-auto z-[100] transition-all duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Table of Contents"
      >
        <div className="p-6">
          <div className="relative">
            {/* Active Indicator Line */}
            <div
              className="absolute left-0 w-0.5 bg-[var(--primary)] transition-all duration-300 ease-in-out pointer-events-none"
              style={{
                top: `${indicatorStyle.top}px`,
                height: `${indicatorStyle.height}px`,
                opacity: indicatorStyle.opacity,
              }}
            />

            <ul ref={navRef} className="list-none p-0 m-0 space-y-8">
              {Object.entries(groupedSections).map(([groupName, groupItems]) => (
                <li key={groupName}>
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase text-[var(--text-muted)] tracking-widest mb-4 px-2">
                    <span>{groupName}</span>
                    <svg className="w-3 h-3 text-slate-200 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <ul className="list-none p-0 m-0 space-y-1">
                    {groupItems.map((section) => {
                      const langPath = `/${section.lang}`
                      const isSameLang = pathname === langPath
                      const href = isSameLang ? `#${section.id}` : `${langPath}#${section.id}`
                      const isActive = activeSection === `#${section.id}`

                      return (
                        <li key={section.id}>
                          <Link
                            href={href}
                            onClick={onClose}
                            className={`block px-4 py-2 text-sm rounded-lg transition-all no-underline ${
                              isActive
                                ? 'text-[var(--primary)] dark:text-white font-bold bg-[var(--primary-light)] dark:bg-indigo-500/10'
                                : 'text-[var(--text-secondary)] dark:text-slate-400 hover:text-[var(--primary)] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                            }`}
                          >
                            {section.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progress indicator at bottom */}
        <div className="sticky bottom-0 bg-[var(--bg-sidebar)]/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-t border-slate-100 dark:border-[#1e293b] p-6">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Progress</span>
            <span className="text-[10px] text-[var(--primary)] font-bold tracking-tighter">{progress}%</span>
          </div>
          <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--primary)] transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </nav>
    </>
  )
}
