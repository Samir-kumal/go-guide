'use client'
import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

interface Props {
  children: string
  language?: string
}

export function CodeBlock({ children, language = 'go' }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children.trim()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  // Map user-friendly language names to prism-supported ones
  const lang = language.toLowerCase() === 'go' ? 'go' : 
               language.toLowerCase() === 'php' ? 'php' : 
               language.toLowerCase() === 'javascript' || language.toLowerCase() === 'js' ? 'javascript' :
               language.toLowerCase() === 'typescript' || language.toLowerCase() === 'ts' ? 'typescript' :
               language.toLowerCase() === 'bash' || language.toLowerCase() === 'shell' ? 'bash' : 'go'

  return (
    <div className="relative my-10 group shadow-2xl shadow-indigo-500/10">
      <div className="relative overflow-hidden rounded-2xl border border-slate-800">
        {/* Header / Title Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-[var(--code-header)] border-b border-slate-800/50">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[var(--code-dot-red)] opacity-90 shadow-sm shadow-red-900/20"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[var(--code-dot-yellow)] opacity-90 shadow-sm shadow-amber-900/20"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[var(--code-dot-green)] opacity-90 shadow-sm shadow-emerald-900/20"></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.25em]">{language}</span>
          </div>
        </div>

        {/* Syntax Highlighted Content */}
        <Highlight
          theme={themes.dracula}
          code={children.trim()}
          language={lang}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="bg-[var(--code-bg)] p-6 overflow-x-auto text-[13px] font-mono leading-relaxed selection:bg-indigo-500/30"
              style={{ ...style, backgroundColor: '#1E1E2E' }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex">
                  <span className="inline-block w-8 text-slate-600 text-right mr-6 select-none font-mono opacity-50">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`absolute top-[4.25rem] right-5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shadow-lg ${
            copied
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-emerald-500/10'
              : 'bg-slate-900/80 text-slate-400 border-slate-700/50 hover:text-white hover:bg-slate-800 hover:border-slate-600 group-hover:opacity-100 opacity-0'
          }`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
