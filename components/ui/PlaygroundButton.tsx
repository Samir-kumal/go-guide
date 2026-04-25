interface Props {
  onClick: () => void
}

export function PlaygroundButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      title="Go Playground"
      aria-label="Open Go Playground"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-[var(--primary)] text-white shadow-2xl shadow-indigo-500/40 flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer border-none"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  )
}
