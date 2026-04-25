export function ComparisonTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden my-12 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl shadow-slate-200/40 dark:shadow-none transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm 
          [&_thead]:bg-slate-50 [&_thead]:dark:bg-[#1e293b] [&_thead]:border-b [&_thead]:border-slate-100 [&_thead]:dark:border-slate-700
          [&_th]:px-6 [&_th]:py-5 [&_th]:text-[var(--primary)] [&_th]:dark:text-slate-400 [&_th]:text-[10px] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-[0.2em]
          [&_td]:px-6 [&_td]:py-5 [&_td]:text-[var(--text-secondary)] [&_td]:dark:text-slate-200 [&_td]:border-b [&_td]:border-slate-50 [&_td]:dark:border-slate-800/50
          [&_tbody_tr:last-child_td]:border-b-0
          [&_tbody_tr:hover]:bg-slate-50/50 [&_tbody_tr:hover]:dark:bg-slate-800/30 transition-colors">
          {children}
        </table>
      </div>
    </div>
  )
}
