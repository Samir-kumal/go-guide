export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 dark:bg-[#1e293b] border-l-4 border-[var(--accent-cyan)] p-6 my-10 rounded-r-2xl shadow-xl shadow-slate-200/40 dark:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-5">
        <div className="w-10 h-10 bg-cyan-50 dark:bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-cyan-600 dark:text-cyan-400 text-lg">ℹ️</span>
        </div>
        <div className="text-[var(--text-secondary)] dark:text-slate-200 text-sm leading-relaxed pt-1 font-medium">
          {children}
        </div>
      </div>
    </div>
  )
}
