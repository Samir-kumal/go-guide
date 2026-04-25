# Go Playground Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a floating play button on Go pages that opens a full-height right-side sheet with a CodeMirror editor and live Go execution via the public Go Playground API.

**Architecture:** A floating `PlaygroundButton` (fixed bottom-right) is mounted in `LayoutShell` and only visible on `/go` routes. Clicking it toggles `GoPlayground`, a full-height right sheet containing a CodeMirror 6 editor (Dracula theme, Go syntax) and an output panel. Execution POSTs to `https://play.golang.org/compile` client-side — no backend required.

**Tech Stack:** `@uiw/react-codemirror`, `@codemirror/lang-go`, `@uiw/codemirror-theme-dracula`, Vitest + React Testing Library

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `components/ui/GoPlayground.tsx` | Create | Sheet: editor, run button, output panel |
| `components/ui/GoPlayground.test.tsx` | Create | Tests for GoPlayground |
| `components/ui/PlaygroundButton.tsx` | Create | Floating trigger button |
| `components/ui/PlaygroundButton.test.tsx` | Create | Tests for PlaygroundButton |
| `components/ui/index.ts` | Modify | Export both new components |
| `components/layout/LayoutShell.tsx` | Modify | Mount button + sheet, manage open state |

---

## Task 1: Install CodeMirror dependencies

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install packages**

```bash
npm install @uiw/react-codemirror @codemirror/lang-go @uiw/codemirror-theme-dracula
```

Expected: packages added to `node_modules`, `package.json` updated with three new entries under `dependencies`.

- [ ] **Step 2: Verify install**

```bash
node -e "require('@uiw/react-codemirror'); console.log('ok')"
```

Expected output: `ok`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install codemirror packages for Go Playground"
```

---

## Task 2: Create PlaygroundButton component (TDD)

**Files:**
- Create: `components/ui/PlaygroundButton.tsx`
- Create: `components/ui/PlaygroundButton.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `components/ui/PlaygroundButton.test.tsx`:

```tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlaygroundButton } from './PlaygroundButton'

describe('PlaygroundButton', () => {
  it('renders a button with aria-label', () => {
    render(<PlaygroundButton onClick={() => {}} />)
    expect(screen.getByRole('button', { name: /open go playground/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handler = vi.fn()
    const user = userEvent.setup()
    render(<PlaygroundButton onClick={handler} />)
    await user.click(screen.getByRole('button', { name: /open go playground/i }))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- --reporter=verbose components/ui/PlaygroundButton.test.tsx
```

Expected: FAIL — `PlaygroundButton` not found

- [ ] **Step 3: Implement PlaygroundButton**

Create `components/ui/PlaygroundButton.tsx`:

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- --reporter=verbose components/ui/PlaygroundButton.test.tsx
```

Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/ui/PlaygroundButton.tsx components/ui/PlaygroundButton.test.tsx
git commit -m "feat: add PlaygroundButton floating trigger"
```

---

## Task 3: Create GoPlayground component (TDD)

**Files:**
- Create: `components/ui/GoPlayground.tsx`
- Create: `components/ui/GoPlayground.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `components/ui/GoPlayground.test.tsx`:

```tsx
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GoPlayground } from './GoPlayground'

// Mock CodeMirror — jsdom cannot run it
vi.mock('@uiw/react-codemirror', () => ({
  default: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <textarea
      data-testid="codemirror-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}))

const mockFetch = (response: object) => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      json: () => Promise.resolve(response),
    })
  )
}

describe('GoPlayground', () => {
  afterEach(() => vi.restoreAllMocks())

  it('is hidden when isOpen is false', () => {
    render(<GoPlayground isOpen={false} onClose={() => {}} />)
    const sheet = screen.getByTestId('playground-sheet')
    expect(sheet).toHaveClass('translate-x-full')
  })

  it('is visible when isOpen is true', () => {
    render(<GoPlayground isOpen={true} onClose={() => {}} />)
    const sheet = screen.getByTestId('playground-sheet')
    expect(sheet).toHaveClass('translate-x-0')
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<GoPlayground isOpen={true} onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: /close playground/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<GoPlayground isOpen={true} onClose={onClose} />)
    await user.click(screen.getByTestId('playground-backdrop'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders editor with default Hello World code', () => {
    render(<GoPlayground isOpen={true} onClose={() => {}} />)
    const editor = screen.getByTestId('codemirror-editor') as HTMLTextAreaElement
    expect(editor.value).toContain('fmt.Println("Hello, World!")')
  })

  it('shows idle placeholder in output panel initially', () => {
    render(<GoPlayground isOpen={true} onClose={() => {}} />)
    expect(screen.getByText(/output will appear here/i)).toBeInTheDocument()
  })

  it('shows success output after running', async () => {
    mockFetch({ Errors: '', Events: [{ Message: 'Hello, World!\n', Kind: 'stdout', Delay: 0 }] })
    const user = userEvent.setup()
    render(<GoPlayground isOpen={true} onClose={() => {}} />)
    await user.click(screen.getByRole('button', { name: /run/i }))
    await waitFor(() => expect(screen.getByText('Hello, World!')).toBeInTheDocument())
  })

  it('shows compile error output', async () => {
    mockFetch({ Errors: 'syntax error: unexpected }', Events: [] })
    const user = userEvent.setup()
    render(<GoPlayground isOpen={true} onClose={() => {}} />)
    await user.click(screen.getByRole('button', { name: /run/i }))
    await waitFor(() => expect(screen.getByText(/syntax error/i)).toBeInTheDocument())
  })

  it('shows network error when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
    const user = userEvent.setup()
    render(<GoPlayground isOpen={true} onClose={() => {}} />)
    await user.click(screen.getByRole('button', { name: /run/i }))
    await waitFor(() => expect(screen.getByText(/failed to reach go playground/i)).toBeInTheDocument())
  })

  it('disables run button while running', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => new Promise(() => {})) // never resolves
    )
    const user = userEvent.setup()
    render(<GoPlayground isOpen={true} onClose={() => {}} />)
    await user.click(screen.getByRole('button', { name: /run/i }))
    expect(screen.getByRole('button', { name: /run/i })).toBeDisabled()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- --reporter=verbose components/ui/GoPlayground.test.tsx
```

Expected: FAIL — `GoPlayground` not found

- [ ] **Step 3: Implement GoPlayground**

Create `components/ui/GoPlayground.tsx`:

```tsx
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
      const data: PlaygroundResponse = await res.json()
      if (data.Errors) {
        setOutput(data.Errors)
        setStatus('error')
      } else {
        setOutput(data.Events.map((e) => e.Message).join(''))
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

      {/* Sheet */}
      <div
        data-testid="playground-sheet"
        className={`fixed top-0 right-0 h-full w-[45%] min-w-[480px] bg-[var(--code-bg)] z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[var(--code-header)] border-b border-slate-800/50 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">▶</span>
            <span className="font-bold text-slate-200 tracking-tight">Go Playground</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close playground"
            className="text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-2xl leading-none px-1"
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
            className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-bold tracking-widest uppercase transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:opacity-90 border-none"
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- --reporter=verbose components/ui/GoPlayground.test.tsx
```

Expected: PASS (9 tests)

- [ ] **Step 5: Commit**

```bash
git add components/ui/GoPlayground.tsx components/ui/GoPlayground.test.tsx
git commit -m "feat: add GoPlayground sheet component with CodeMirror editor"
```

---

## Task 4: Export from index

**Files:**
- Modify: `components/ui/index.ts`

- [ ] **Step 1: Add exports**

Edit `components/ui/index.ts` — append two lines:

```ts
export { CodeBlock } from './CodeBlock'
export { Note } from './Note'
export { Warning } from './Warning'
export { Tip } from './Tip'
export { ComparisonTable } from './ComparisonTable'
export { ComparisonGrid } from './ComparisonGrid'
export { DeepDive } from './DeepDive'
export { GoPlayground } from './GoPlayground'
export { PlaygroundButton } from './PlaygroundButton'
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/ui/index.ts
git commit -m "feat: export GoPlayground and PlaygroundButton from ui index"
```

---

## Task 5: Wire into LayoutShell

**Files:**
- Modify: `components/layout/LayoutShell.tsx`

- [ ] **Step 1: Update LayoutShell**

Replace the entire content of `components/layout/LayoutShell.tsx` with:

```tsx
'use client'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SectionEntry } from '@/lib/sections'
import { useSidebarScroll } from '@/hooks/useSidebarScroll'
import { Sidebar } from './Sidebar'
import { ThemeToggle } from './ThemeToggle'
import { getLanguage } from '@/lib/languages'
import Link from 'next/link'
import { GoPlayground, PlaygroundButton } from '@/components/ui'

interface Props {
  children: React.ReactNode
  sections: SectionEntry[]
  langId: string
}

export function LayoutShell({ children, sections, langId }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false)
  const pathname = usePathname()
  const lang = getLanguage(langId)

  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])
  const { activeSection, progress } = useSidebarScroll(sectionIds)

  const showPlayground = pathname.startsWith('/go')

  return (
    <div className="min-h-screen bg-[var(--bg-page)] transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-[var(--nav-h)] bg-[var(--bg-sidebar)] dark:bg-[#0f172a] border-b border-slate-200/60 dark:border-[#1e293b] flex items-center justify-between px-8 z-[100] transition-colors duration-300 shadow-sm shadow-indigo-500/5">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              G
            </div>
            <span className="font-black tracking-tight text-[var(--text-primary)] text-xl">GoCode</span>
          </Link>

          <nav className="hidden xl:flex items-center gap-8">
            <Link href="#quick-comparison" className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline">Quick Comparison</Link>
            <Link href="#code-breakdown" className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline">Code Breakdown</Link>
            <Link href="#deep-dive" className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline">Deep Dive</Link>
            <Link href="#literals-types" className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline">Literals & Types</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors bg-transparent border-none cursor-pointer rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <ThemeToggle />

          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2.5 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors bg-transparent border-none cursor-pointer rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex pt-[var(--nav-h)]">
        <Sidebar 
          sections={sections} 
          activeSection={activeSection || `#${pathname.split('/').pop()}`} 
          progress={progress} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-[var(--sidebar-w)] min-w-0">
          <div className="max-w-[1000px] mx-auto px-10 lg:px-16 py-16">
            {children}
          </div>
        </main>
      </div>

      {showPlayground && (
        <PlaygroundButton onClick={() => setIsPlaygroundOpen(true)} />
      )}

      <GoPlayground
        isOpen={isPlaygroundOpen}
        onClose={() => setIsPlaygroundOpen(false)}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Run all tests**

```bash
npm test
```

Expected: all tests pass

- [ ] **Step 4: Commit**

```bash
git add components/layout/LayoutShell.tsx
git commit -m "feat: mount GoPlayground and PlaygroundButton in LayoutShell"
```

---

## Task 6: Manual verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify on Go page**

Navigate to `http://localhost:3000/go`. Confirm:
- Indigo play button visible bottom-right
- Clicking it opens the right sheet with slide-in animation
- CodeMirror editor shows with `Hello, World!` default code
- Clicking backdrop closes the sheet
- Clicking × closes the sheet
- Run button executes the code and shows `Hello, World!` in output
- Introduce a syntax error (delete `}`) → Run → error shown in red

- [ ] **Step 3: Verify on Laravel page**

Navigate to `http://localhost:3000/laravel`. Confirm:
- Play button is **not visible**

- [ ] **Step 4: Final commit if any tweaks made**

```bash
git add -A
git commit -m "fix: Go Playground visual tweaks from manual testing"
```
