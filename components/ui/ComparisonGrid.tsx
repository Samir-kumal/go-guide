export function ComparisonGrid({ left, right, leftTitle = "Laravel", rightTitle = "Go" }: { 
  left: React.ReactNode, 
  right: React.ReactNode,
  leftTitle?: string,
  rightTitle?: string 
}) {
  return (
    /* gap and vertical margin scale down on mobile */
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 my-6 sm:my-12">
      <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-[#1e293b]/50 border-l-4 border-[var(--accent-pink)] shadow-2xl shadow-rose-500/5 dark:shadow-none transition-all duration-300">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-[var(--accent-pink)] text-[10px] font-black uppercase tracking-[0.2em] mb-5 sm:mb-8">
          {leftTitle}
        </div>
        <div className="text-[var(--text-secondary)] dark:text-slate-300 text-sm leading-relaxed font-medium">
          {left}
        </div>
      </div>

      <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-[#1e293b]/50 border-l-4 border-[var(--primary)] shadow-2xl shadow-indigo-500/5 dark:shadow-none transition-all duration-300">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-[var(--primary)] text-[10px] font-black uppercase tracking-[0.2em] mb-5 sm:mb-8">
          {rightTitle}
        </div>
        <div className="text-[var(--text-secondary)] dark:text-slate-300 text-sm leading-relaxed font-medium">
          {right}
        </div>
      </div>
    </div>
  )
}
