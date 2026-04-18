export function ComparisonTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-5">
      <table className="w-full border-collapse [&_th]:bg-[#1a73e8] [&_th]:text-white [&_th]:p-3 [&_th]:text-left [&_td]:border [&_td]:border-[#ddd] [&_td]:p-3 [&_th]:border [&_th]:border-[#ddd] [&_tr:nth-child(even)]:bg-[#f9f9f9]">
        {children}
      </table>
    </div>
  )
}
