'use client'
import { SectionEntry } from '@/lib/sections'

interface Props {
  sections: SectionEntry[]
  activeSection: string
  progress: number
}

export function Sidebar({ sections, activeSection, progress }: Props) {
  return (
    <nav className="fixed left-0 top-0 w-[240px] h-screen bg-[#1a1a2e] text-white p-5 overflow-y-auto shadow-[2px_0_10px_rgba(0,0,0,0.1)] z-[100] hidden md:block">
      {/* Progress */}
      <div className="sticky top-0 bg-[#1a1a2e] pb-4 mb-4 border-b border-[#333]">
        <div className="h-1 bg-[#333] rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1a73e8] to-[#00d4aa] transition-[width_0.3s]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[11px] text-[#888] mt-2 text-center">{progress}% complete</div>
      </div>

      <h3 className="text-white text-[14px] uppercase tracking-widest mb-4 pb-2 border-b border-[#333]">
        📚 Contents
      </h3>

      <ul className="list-none p-0 m-0">
        {sections.map((section) => (
          <li key={section.id} className="my-1">
            {section.group && (
              <div className="text-[11px] uppercase text-[#666] tracking-widest mt-4 pl-4">
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
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
