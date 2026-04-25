export function DeepDive({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <details className="my-8 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#1e293b]/30 overflow-hidden group transition-colors duration-300">
      <summary className="px-6 py-5 cursor-pointer flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors list-none">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-200 dark:border-blue-500/20">
            Deep Dive
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-200">{title}</span>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-open:rotate-180 transition-transform">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </summary>
      <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-6">
        {children}
      </div>
    </details>
  )
}
