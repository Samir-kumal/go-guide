import { SectionEntry } from '@/lib/sections'

interface Props {
  activeSection: string
  sections: SectionEntry[]
}

export function ActiveIndicator({ activeSection, sections }: Props) {
  const current = sections.find((s) => `#${s.id}` === activeSection)
  if (!current) return null

  return (
    <div className="fixed left-[calc(var(--sidebar-w)+10px)] top-1/2 -translate-y-1/2 bg-[#1a73e8] text-white px-3 py-2 rounded-full text-xs z-[101] hidden md:block">
      📍 {current.label.substring(0, 30)}
    </div>
  )
}
