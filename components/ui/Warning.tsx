export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 dark:bg-[#1e293b] border-l-4 border-[var(--accent-orange)] p-6 my-10 rounded-r-2xl shadow-xl shadow-amber-500/10 dark:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-5">
        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-amber-600 dark:text-amber-400 text-lg">⚠️</span>
        </div>
        <div className="text-amber-900 dark:text-slate-200 text-sm leading-relaxed pt-1 font-medium">
          {children}
        </div>
      </div>
    </div>
  )
}
