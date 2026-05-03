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
    <div className="relative my-6 sm:my-10 group shadow-2xl shadow-indigo-500/10">
      <div className="relative overflow-hidden rounded-2xl border border-slate-800">
        {/* Header / Title Bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[var(--code-header)] border-b border-slate-800/50">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[var(--code-dot-red)] opacity-90 shadow-sm shadow-red-900/20"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[var(--code-dot-yellow)] opacity-90 shadow-sm shadow-amber-900/20"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[var(--code-dot-green)] opacity-90 shadow-sm shadow-emerald-900/20"></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.25em]">{language}</span>
          </div>
        </div>

        {/* Syntax Highlighted Content
            Mobile : p-3, narrower line-number gutter (w-5 mr-3)
            Desktop: p-6, standard gutter (w-8 mr-6)
            overflow-x-auto ensures horizontal scroll on long lines
        */}
        <Highlight
          theme={themes.dracula}
          code={children.trim()}
          language={lang}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="bg-[var(--code-bg)] p-3 sm:p-6 overflow-x-auto text-[12px] sm:text-[13px] font-mono leading-relaxed selection:bg-indigo-500/30"
              style={{ ...style, backgroundColor: '#1E1E2E' }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex">
                  {/* Line number: narrower on mobile to give code more room */}
                  <span className="inline-block w-5 sm:w-8 text-slate-600 text-right mr-3 sm:mr-6 select-none font-mono opacity-50 shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        {/* Copy Button — always visible on mobile (no hover required) */}
        <button
          onClick={handleCopy}
          className={`absolute top-[4.25rem] right-3 sm:right-5 px-3 sm:px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shadow-lg min-h-[36px] ${
            copied
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-emerald-500/10'
              : 'bg-slate-900/80 text-slate-400 border-slate-700/50 hover:text-white hover:bg-slate-800 hover:border-slate-600 sm:group-hover:opacity-100 sm:opacity-0'
          }`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
