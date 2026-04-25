# Go Playground — Design Spec

**Date:** 2026-04-25

## Overview

A floating button (bottom-right) on Go pages that opens a full-height right-side sheet containing an editable Go code editor powered by CodeMirror 6. Users write Go from scratch, hit Run, and see stdout/errors inline. Execution uses the public Go Playground API — no backend required.

---

## Components

### `components/ui/GoPlayground.tsx`
Full-height right sheet. Props: `isOpen: boolean`, `onClose: () => void`.

Layout (top → bottom):
1. Header bar — "Go Playground" title + close (×) button
2. CodeMirror editor — ~60% height, scrollable, Dracula theme, line numbers, Go syntax highlighting (`@codemirror/lang-go`)
3. Run button — full-width indigo, disabled + spinner while running
4. Output panel — ~40% height, monospace, dark bg matching `--code-bg`

Default editor content: minimal `Hello, World!` main package so the editor is never blank.

### `components/ui/PlaygroundButton.tsx`
Fixed floating button. Position: `bottom-6 right-6`, `z-50`. Style: `bg-[var(--primary)]` (indigo), white terminal/play icon, scale on hover, tooltip "Go Playground". Clicking toggles `GoPlayground` open/closed.

Rendered inside `LayoutShell.tsx`. Only visible when `usePathname()` starts with `/go`.

---

## API Integration

```
POST https://play.golang.org/compile
Content-Type: application/x-www-form-urlencoded
Body: body=<urlencoded_code>&version=2
```

Response:
```json
{ "Errors": "", "Events": [{ "Message": "Hello, World!\n", "Kind": "stdout", "Delay": 0 }] }
```

### State Machine

| State    | Trigger                        | Output panel display                        |
|----------|--------------------------------|---------------------------------------------|
| idle     | initial / after reset          | placeholder: "Output will appear here..."   |
| running  | Run clicked                    | spinner + "Running..."                       |
| success  | `Events` returned, no errors   | joined message strings, green-tinted text   |
| error    | `Errors` non-empty             | error string, red-tinted text               |
| network  | fetch throws                   | "Failed to reach Go Playground", red        |

---

## Visual Design

| Element          | Value                                                             |
|------------------|-------------------------------------------------------------------|
| Sheet width      | `w-[45%]` min `480px`                                             |
| Sheet bg         | `--code-bg` (`#1E1E2E`)                                           |
| Header bg        | `--code-header` (`#282A3A`)                                       |
| Editor theme     | Dracula (matches existing `prism-react-renderer` theme)           |
| Backdrop         | `bg-black/40`, click to close                                     |
| Sheet animation  | `transform: translateX(100%)` → `translateX(0)`, CSS transition  |
| Run button       | `bg-[var(--primary)]`, full-width, disabled while running         |
| Output success   | `text-[var(--code-text)]` (`#CDD6F4`)                             |
| Output error     | `text-[var(--code-variable)]` (`#F38BA8`)                         |
| Floating button  | `bg-[var(--primary)]`, `bottom-6 right-6`, `z-50`, scale on hover|

---

## Dependencies

- `@codemirror/view`, `@codemirror/state` — CodeMirror 6 core
- `@codemirror/lang-go` — Go language support
- `@codemirror/theme-one-dark` or Dracula community theme — editor theme
- `codemirror` — umbrella package (includes extensions)

All are small, tree-shakeable, and do not conflict with `prism-react-renderer`.

---

## Files Changed

| File | Change |
|------|--------|
| `components/ui/GoPlayground.tsx` | New — sheet component |
| `components/ui/PlaygroundButton.tsx` | New — floating trigger |
| `components/ui/index.ts` | Export both new components |
| `components/layout/LayoutShell.tsx` | Mount `PlaygroundButton` |

No existing CodeBlock or section components are modified.
