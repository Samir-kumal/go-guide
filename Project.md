# Go Guide - Project Documentation

## Project Overview

**Project Name:** Go Guide (go-guide)
**Version:** 0.1.0
**Description:** An interactive educational website explaining Go programming concepts for JavaScript developers.
**Type:** Next.js Web Application / Educational Documentation Site

---

## Technology Stack

### Core Framework
- **Next.js** 16.2.4
- **React** 19.2.4
- **React DOM** 19.2.4

### Styling
- **Tailwind CSS** v4
- **@tailwindcss/postcss** ^4

### TypeScript
- **TypeScript** ^5
- **@types/node** ^20
- **@types/react** ^19
- **@types/react-dom** ^19

### Testing
- **Vitest** ^4.1.4
- **@testing-library/jest-dom** ^6.9.1
- **@testing-library/react** ^16.3.2
- **@testing-library/user-event** ^14.6.1
- **jsdom** ^29.0.2

---

## Project Structure

```
go-guide/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Main page
│
├── components/
│   ├── layout/            # Layout components
│   │   ├── LayoutShell.tsx
│   │   ├── Sidebar.tsx
│   │   └── index.ts
│   │
│   ├── sections/          # Educational content sections (30+ files)
│   │   ├── QuickComparison.tsx
│   │   ├── CodeBreakdown.tsx
│   │   ├── EverySingleLineExplained.tsx
│   │   ├── SourceCodeRepresentation.tsx
│   │   ├── GoLiteralsTypes.tsx
│   │   ├── GetLogFile.tsx
│   │   ├── GetLogFileDetailed.tsx
│   │   └── ... (many more)
│   │   └── major/         # Deep dive sections
│   │
│   └── ui/                # Reusable UI components
│       ├── CodeBlock.tsx
│       ├── ComparisonGrid.tsx
│       ├── ComparisonTable.tsx
│       ├── DeepDive.tsx
│       ├── Note.tsx
│       ├── Tip.tsx
│       ├── Warning.tsx
│       └── index.ts
│
├── hooks/                 # Custom React hooks
│   ├── useSidebarScroll.ts
│   └── useSidebarScroll.test.ts
│
├── lib/                   # Library code
│   └── sections.ts        # Section definitions
│
├── public/               # Static assets (SVGs)
├── package.json          # Dependencies
├── tsconfig.json        # TypeScript config
├── next.config.ts       # Next.js config
├── vitest.config.ts     # Test config
├── AGENTS.md           # Agent instructions
└── CLAUDE.md          # Claude-specific instructions
```

---

## Key Components

### Layout Components
- **LayoutShell**: Main wrapper with sidebar and content area
- **Sidebar**: Fixed navigation with scroll progress, active indicator

### UI Components  
- **CodeBlock**: Code display with copy button
- **ComparisonGrid/Table**: Go vs JS side-by-side
- **Note/Tip/Warning**: Colored info boxes

### Custom Hooks
- **useSidebarScroll**: Tracks visible section and progress percentage

---

## Sections (44 Total)

Organized into navigation groups:

| Group | Sections |
|-------|----------|
| Core Basics | Quick Comparison, Code Breakdown, getLogFile, if With Initialization... |
| 🔍 Deep Dive | Every Single Line Explained, Source Code Representation |
| 📝 Literals & Types | Floating-Point, Imaginary, Rune, String, Constants, Variables, Types... |
| ⚡ Key Concepts | Blank Identifier, Pointers, Error Handling, Defer, Structs, Interfaces |
| 🎮 Concurrency | Go vs JS, Goroutines, Channels, Sync Package, Context |

---

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Start production server
npm test          # Run tests
```

---

## Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.2.4 | React framework |
| react | 19.2.4 | UI library |
| tailwindcss | ^4 | CSS styling |
| typescript | ^5 | Type safety |
| vitest | ^4.1.4 | Testing |

---

## Build Status

✅ Production build passes
✅ TypeScript type checking passes
✅ All 44+ sections render correctly
