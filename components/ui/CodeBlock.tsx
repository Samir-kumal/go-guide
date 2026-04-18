'use client'
import { useState } from 'react'

interface Props {
  children: string
  language?: string
}

export function CodeBlock({ children, language }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      // clipboard unavailable in non-secure contexts
    })
  }

  return (
    <div className="relative my-5">
      <pre className="bg-[#282c34] text-[#abb2bf] p-5 rounded-lg overflow-x-auto text-sm" data-language={language}>
        <code>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className={`absolute top-2.5 right-2.5 px-2.5 py-1.5 rounded text-xs text-white border transition-colors ${
          copied
            ? 'bg-green-500 border-green-500'
            : 'bg-white/10 border-white/20 hover:bg-white/20'
        }`}
      >
        {copied ? '✅ Copied!' : '📋 Copy'}
      </button>
    </div>
  )
}
