export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--tip-bg)] dark:bg-[#1e293b] border-l-4 border-[var(--tip-border)] p-6 my-10 rounded-r-2xl shadow-xl shadow-indigo-500/10 dark:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-5">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-[var(--tip-border)] text-lg">💡</span>
        </div>
        <div className="text-[var(--tip-text)] dark:text-slate-200 text-sm leading-relaxed pt-1 font-medium">
          {children}
        </div>
      </div>
    </div>
  )
}
