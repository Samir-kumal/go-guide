import { ReactNode } from 'react'

interface DeepDiveProps {
  title?: string
  children: ReactNode
}

export function DeepDive({ title = 'Staff Engineer Deep Dive', children }: DeepDiveProps) {
  return (
    <details className="my-6 border border-[#e0e0e0] rounded-lg overflow-hidden group">
      <summary className="bg-[#f8f9fa] p-4 cursor-pointer flex items-center justify-between hover:bg-[#f1f3f4] transition-colors list-none">
        <div className="flex items-center gap-2">
          <span className="bg-[#1a73e8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Staff Level
          </span>
          <span className="font-semibold text-[#3c4043]">{title}</span>
        </div>
        <span className="text-[#5f6368] group-open:rotate-180 transition-transform">
          ▼
        </span>
      </summary>
      <div className="p-4 bg-white border-t border-[#e0e0e0] text-[#3c4043] leading-relaxed">
        {children}
      </div>
    </details>
  )
}
