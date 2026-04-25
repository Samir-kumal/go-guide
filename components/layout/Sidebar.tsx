'use client'
import { useRef, useEffect, useState } from 'react'
import { SectionEntry } from '@/lib/sections'

interface Props {
  sections: SectionEntry[]
  activeSection: string
  progress: number
}

export function Sidebar({ sections, activeSection, progress }: Props) {
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 })
  const navRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!activeSection) {
      setIndicatorStyle((s) => ({ ...s, opacity: 0 }))
      return
    }

    // Find the active link element to get its position
    const activeLink = navRef.current?.querySelector(`a[href="${activeSection}"]`)
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
    }
  }, [activeSection, sections])

  return (
    <nav className="fixed left-0 top-0 w-[var(--sidebar-w)] h-screen bg-[#1a1a2e] text-white p-5 overflow-y-auto shadow-[2px_0_10px_rgba(0,0,0,0.1)] z-[100] hidden md:block">
      {/* Progress */}
      <div className="sticky top-0 bg-[#1a1a2e] pb-4 mb-4 border-b border-[#333]">
        <div className="h-1 bg-[#333] rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1a73e8] to-[#00d4aa] transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[11px] text-[#888] mt-2 text-center">{progress}% complete</div>
      </div>

      <h3 className="text-white text-[14px] uppercase tracking-widest mb-4 pb-2 border-b border-[#333]">
        📚 Contents
      </h3>

      <div className="relative">
        {/* Active Indicator - dynamic positioning */}
        <div
          className="absolute left-[-20px] w-1 bg-[#1a73e8] rounded-r transition-all duration-300 ease-in-out pointer-events-none"
          style={{
            top: `${indicatorStyle.top}px`,
            height: `${indicatorStyle.height}px`,
            opacity: indicatorStyle.opacity,
          }}
        />

        <ul ref={navRef} className="list-none p-0 m-0 relative">
          {sections.map((section) => (
            <li key={section.id} className="my-1">
              {section.group && (
                <div className="text-[11px] uppercase text-[#666] tracking-widest mt-4 pl-4 mb-1">
                  {section.group}
                </div>
              )}
              <a
                href={`#${section.id}`}
                className={`block px-4 py-2.5 text-[13px] rounded-md border-l-[3px] transition-all no-underline ${
                  activeSection === `#${section.id}`
                    ? 'bg-[rgba(26,115,232,0.2)] text-[#1a73e8] border-l-[#1a73e8]'
                    : 'text-[#c0c0c0] border-l-transparent hover:bg-white/10 hover:text-white'
                }`}
              >
                {activeSection === `#${section.id}` && <span className="mr-2">📍</span>}
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
