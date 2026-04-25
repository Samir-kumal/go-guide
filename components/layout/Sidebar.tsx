'use client'
import { useRef, useEffect, useState } from 'react'
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
    // In long-scroll, the active section comes from the IntersectionObserver (activeSection prop)
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

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[90] md:hidden" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav 
        className={`fixed left-0 top-0 w-[var(--sidebar-w)] h-screen bg-[#1a1a2e] text-white p-5 overflow-y-auto shadow-[2px_0_10px_rgba(0,0,0,0.1)] z-[100] transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Table of Contents"
      >
        {/* Progress Bar with A11y */}
        <div className="sticky top-0 bg-[#1a1a2e] pb-4 mb-4 border-b border-[#333]">
          <div 
            className="h-1 bg-[#333] rounded overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
          >
            <div
              className="h-full bg-gradient-to-r from-[#1a73e8] to-[#00d4aa] transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[11px] text-[#888] mt-2 text-center" aria-hidden="true">
            {progress}% complete
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#333]">
          <h3 className="text-white text-[14px] uppercase tracking-widest m-0">
            📚 Contents
          </h3>
          <button 
            onClick={onClose}
            className="md:hidden text-white border-none bg-transparent cursor-pointer p-1"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="relative">
          <div
            className="absolute left-[-20px] w-1 bg-[#1a73e8] rounded-r transition-all duration-300 ease-in-out pointer-events-none"
            style={{
              top: `${indicatorStyle.top}px`,
              height: `${indicatorStyle.height}px`,
              opacity: indicatorStyle.opacity,
            }}
          />

          <ul ref={navRef} className="list-none p-0 m-0 relative">
            {sections.map((section) => {
              const langPath = `/${section.lang}`
              const isSameLang = pathname === langPath
              const href = isSameLang ? `#${section.id}` : `${langPath}#${section.id}`
              const isActive = activeSection === `#${section.id}`

              return (
                <li key={section.id} className="my-1">
                  {section.group && (
                    <div className="text-[11px] uppercase text-[#666] tracking-widest mt-4 pl-4 mb-1">
                      {section.group}
                    </div>
                  )}
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`block px-4 py-2.5 text-[13px] rounded-md border-l-[3px] transition-all no-underline ${
                      isActive
                        ? 'bg-[rgba(26,115,232,0.2)] text-[#1a73e8] border-l-[#1a73e8]'
                        : 'text-[#c0c0c0] border-l-transparent hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {isActive && <span className="mr-2" aria-hidden="true">📍</span>}
                    {section.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </>
  )
}
