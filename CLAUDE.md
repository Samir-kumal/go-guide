@AGENTS.md

# go-guide Codebase Guide

## Project Overview

**go-guide** is a Next.js 16 educational documentation site that teaches Go, PHP, and Laravel to JavaScript developers. It features interactive code sections, a live Go Playground (CodeMirror + play.golang.org), syntax-highlighted code blocks, and a responsive sidebar with progress tracking.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.4 (App Router) |
| UI | React 19.2.4 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Code Editor | CodeMirror 6 (`@uiw/react-codemirror`) with Go syntax + Dracula theme |
| Syntax Highlight | `prism-react-renderer` (static code blocks) |
| Theming | `next-themes` (light / dark / system) |
| Testing | Vitest 4 + React Testing Library + jsdom |

## Directory Structure

```
go-guide/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout — wraps with ThemeProvider
│   ├── page.tsx                # Landing page (language cards)
│   ├── globals.css             # CSS variables design system
│   ├── go/
│   │   ├── layout.tsx          # Wraps content in LayoutShell with goSections
│   │   ├── page.tsx            # Go index page
│   │   └── [section]/page.tsx  # Dynamic section routing
│   ├── laravel/                # Same pattern as go/
│   └── php/                    # Same pattern as go/
│
├── components/
│   ├── layout/
│   │   ├── LayoutShell.tsx     # App shell: header, sidebar, content, playground
│   │   ├── Sidebar.tsx         # Navigation with active indicator & progress bar
│   │   ├── ThemeToggle.tsx     # Dark/light toggle button
│   │   └── index.ts
│   ├── ui/
│   │   ├── CodeBlock.tsx       # Prism-highlighted code with copy button
│   │   ├── GoPlayground.tsx    # CodeMirror editor + play.golang.org execution
│   │   ├── PlaygroundButton.tsx # Floating trigger (bottom-right)
│   │   ├── ComparisonTable.tsx / ComparisonGrid.tsx
│   │   ├── Note.tsx, Tip.tsx, Warning.tsx, DeepDive.tsx
│   │   └── index.ts
│   ├── sections/
│   │   └── go/                 # ~50 tutorial section components
│   ├── docs/
│   │   └── LanguageNav.tsx
│   └── providers/
│       └── ThemeProvider.tsx   # next-themes wrapper
│
├── hooks/
│   └── useSidebarScroll.ts     # IntersectionObserver — tracks active section + progress
│
├── lib/
│   ├── languages.ts            # LanguageConfig type + supported languages (go, php, laravel)
│   └── sections.ts             # Section definitions + getSectionsByLanguage()
│
├── docs/
│   └── superpowers/
│       ├── specs/              # Feature design specs
│       └── plans/              # Implementation plans
│
├── middleware.ts               # Redirects /#section-id → /go/section-id
├── next.config.ts              # Minimal — no special config
├── vitest.config.ts            # jsdom, globals true, @ alias
├── vitest.setup.ts             # Imports @testing-library/jest-dom
├── postcss.config.mjs          # @tailwindcss/postcss plugin
└── tsconfig.json               # ES2017 target, strict, @/* path alias
```

## Development Commands

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm run start      # Serve production build
npm run test       # Run Vitest once
npm run test:watch # Vitest in watch mode
```

## Key Conventions

### TypeScript
- Strict mode enabled — no implicit `any`, no unchecked nullable access.
- Path alias `@/` maps to the repo root (e.g., `@/components/ui/CodeBlock`).
- Types live co-located with their module (`lib/languages.ts` exports `LanguageConfig`).

### React / Next.js
- **Client components** must carry `'use client'` at the top of the file. Only add it where state, effects, or browser APIs are needed — keep server components as the default.
- Route layouts (`app/go/layout.tsx`) import from `@/lib/sections` and pass section lists to `LayoutShell`.
- Dynamic sections use the `[section]` segment; the slug maps directly to a component in `components/sections/go/`.

### Styling
- Tailwind v4 utility classes are primary. Global overrides go in `app/globals.css`.
- Design tokens are CSS custom properties defined in `:root` inside `globals.css`:
  - `--primary` (#6366F1 indigo), `--bg-page`, `--bg-sidebar`, `--text-primary`, `--text-secondary`
  - Code block tokens: `--code-bg`, `--code-header`, `--code-text`, `--code-keyword`, `--code-string`, etc.
- Dark mode: `next-themes` adds a `class` attribute on `<html>`; use `dark:` Tailwind variants.
- Sidebar width: `--sidebar-w: 260px`; navbar height: `--nav-h: 64px`.

### Components
- **`CodeBlock`** — renders static syntax-highlighted code via Prism. Props: `children` (code string), `language` (default `'go'`). Supports: `go`, `php`, `javascript`, `typescript`, `bash`.
- **`GoPlayground`** — CodeMirror 6 editor sheet. Props: `isOpen`, `onClose`. Calls `play.golang.org/compile` and displays stdout or errors.
- **`PlaygroundButton`** — floating button (bottom-right, `z-50`). Only rendered inside `/go/*` routes.
- **`Note` / `Tip` / `Warning` / `DeepDive`** — callout wrappers for tutorial prose.
- **`ComparisonTable` / `ComparisonGrid`** — side-by-side Go vs JS comparisons.

### Hooks
- **`useSidebarScroll(sectionIds)`** — returns `{ activeSection, progress }`. Uses `IntersectionObserver` (±10% / 80% margin) plus a scroll listener. Cleans up on unmount.

### Testing
- Test files live next to the module they test (`Foo.tsx` → `Foo.test.tsx`).
- Use `@testing-library/react` + `@testing-library/user-event`.
- For user interactions always call `userEvent.setup()`:
  ```typescript
  const user = userEvent.setup()
  await user.click(element)
  ```
- Mock browser APIs (`IntersectionObserver`, `fetch`, etc.) with `vi.fn()` / `vi.stubGlobal()`.
- Run with `npm test` before committing.

### Middleware
`middleware.ts` redirects legacy hash URLs (`/#section-id`) to `/go/section-id`. Matcher excludes `api/`, `_next/static`, `_next/image`, `favicon.ico`.

## Adding a New Section

1. Create `components/sections/go/MySectionName.tsx` (client component if interactive).
2. Add an entry to the appropriate group in `lib/sections.ts` under `goSections`.
3. The dynamic route `app/go/[section]/page.tsx` picks it up automatically — no route file needed.

## Adding a New Language

1. Add a `LanguageConfig` entry in `lib/languages.ts`.
2. Create section definitions in `lib/sections.ts`.
3. Add `app/<lang>/layout.tsx`, `app/<lang>/page.tsx`, `app/<lang>/[section]/page.tsx` following the `go/` pattern.
4. Add a language card on `app/page.tsx`.

## Go Playground Architecture

- `PlaygroundButton` (floating, fixed bottom-right) is mounted in `LayoutShell` and only shown on `/go/*` paths.
- Clicking it sets `isPlaygroundOpen = true`, rendering `GoPlayground` as an overlay sheet.
- `GoPlayground` POSTs to `https://play.golang.org/compile` with the editor content.
- State machine: `idle → running → success | error | network-error`.
- The editor uses `@uiw/react-codemirror` with `@codemirror/lang-go` and the Dracula color theme.

## Git Workflow

- Feature branch: `claude/add-claude-documentation-qWYHL`
- Commit style: `type: short imperative description` (e.g., `feat:`, `fix:`, `chore:`, `docs:`).
- Run tests before pushing: `npm test`.
