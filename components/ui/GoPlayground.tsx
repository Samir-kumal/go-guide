'use client'
import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { go } from '@codemirror/lang-go'
import { dracula } from '@uiw/codemirror-theme-dracula'

const DEFAULT_CODE = `package main

import "fmt"

func main() {
\tfmt.Println("Hello, World!")
}`

type Status = 'idle' | 'running' | 'success' | 'error' | 'network-error'

interface PlaygroundResponse {
  Errors: string
  Events: { Message: string; Kind: string; Delay: number }[]
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function GoPlayground({ isOpen, onClose }: Props) {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleRun = async () => {
    setStatus('running')
    setOutput('')
    try {
      const params = new URLSearchParams({ body: code, version: '2' })
      const res = await fetch('https://play.golang.org/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      if (!res.ok) {
        throw new Error(`Go Playground returned ${res.status}`)
      }
      const data: PlaygroundResponse = await res.json()
      if (data.Errors) {
        setOutput(data.Errors)
        setStatus('error')
      } else {
        setOutput((data.Events ?? []).map((e) => e.Message).join(''))
        setStatus('success')
      }
    } catch {
      setOutput('Failed to reach Go Playground. Check your connection.')
      setStatus('network-error')
    }
  }

  const isError = status === 'error' || status === 'network-error'

  return (
    <>
      {/* Backdrop */}
      <div
        data-testid="playground-backdrop"
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sheet
          Mobile  (<sm): full-screen bottom sheet — slides up from bottom
          Desktop (sm+): right-side panel — slides in from right, 45% wide (min 480 px)
      */}
      <div
        data-testid="playground-sheet"
        className={`fixed bg-[var(--code-bg)] z-50 flex flex-col shadow-2xl transition-transform duration-300
          bottom-0 left-0 right-0 h-[92dvh] rounded-t-2xl
          sm:top-0 sm:bottom-auto sm:left-auto sm:right-0 sm:h-full sm:w-[45%] sm:min-w-[480px] sm:rounded-none
          ${isOpen
            ? 'translate-y-0 sm:translate-y-0 sm:translate-x-0'
            : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[var(--code-header)] border-b border-slate-800/50 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">▶</span>
            <span className="font-bold text-slate-200 tracking-tight">Go Playground</span>
          </div>
          {/* Larger touch target on mobile */}
          <button
            onClick={onClose}
            aria-label="Close playground"
            className="text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-2xl leading-none p-2 -mr-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-auto">
          <CodeMirror
            value={code}
            height="100%"
            theme={dracula}
            extensions={[go()]}
            onChange={setCode}
          />
        </div>

        {/* Run Button */}
        <div className="px-4 py-3 bg-[var(--code-header)] border-t border-slate-800/50 shrink-0">
          <button
            onClick={handleRun}
            disabled={status === 'running'}
            aria-label="Run"
            className="w-full py-3 sm:py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-bold tracking-widest uppercase transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:opacity-90 border-none min-h-[44px]"
          >
            {status === 'running' ? '⟳ Running...' : '▶ Run'}
          </button>
        </div>

        {/* Output */}
        <div className="shrink-0 border-t border-slate-800/50">
          <div className="px-5 py-2 bg-[var(--code-header)]">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Output</span>
          </div>
          <pre
            className={`px-5 py-4 font-mono text-sm min-h-[120px] max-h-[240px] overflow-auto whitespace-pre-wrap m-0 ${
              isError ? 'text-[var(--code-variable)]' : 'text-[var(--code-text)]'
            }`}
          >
            {status === 'idle' && (
              <span className="text-slate-600">Output will appear here...</span>
            )}
            {status === 'running' && (
              <span className="text-slate-400">Running...</span>
            )}
            {(status === 'success' || isError) && output}
          </pre>
        </div>
      </div>
    </>
  )
}
