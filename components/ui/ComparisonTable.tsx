export function ComparisonTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-5 border border-[var(--border-light)] rounded-lg">
      <table className="w-full border-collapse min-w-[500px] [&_th]:bg-[var(--brand-blue)] [&_th]:text-white [&_th]:p-3 [&_th]:text-left [&_td]:border-b [&_td]:border-[var(--border-light)] [&_td]:p-3 [&_th]:border-b [&_th]:border-[var(--border-light)] [&_tr:nth-child(even)]:bg-[var(--bg-light)] last:[&_td]:border-b-0">
        {children}
      </table>
    </div>
  )
}
