interface Props {
  goContent: React.ReactNode
  jsContent: React.ReactNode
}

export function ComparisonGrid({ goContent, jsContent }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
      <div className="p-5 rounded-lg text-center bg-[#e0f7f0] border-2 border-[var(--brand-teal)] shadow-sm">
        {goContent}
      </div>
      <div className="p-5 rounded-lg text-center bg-[var(--bg-warning)] border-2 border-[var(--border-warning)] shadow-sm">
        {jsContent}
      </div>
    </div>
  )
}
