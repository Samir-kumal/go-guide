import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Programming Docs',
  description: 'Interactive guides for understanding programming languages and frameworks.',
}

// viewport must be a separate export in Next.js 13.4+ — putting it inside
// metadata is deprecated and silently ignored by the framework.
// viewportFit=cover lets env(safe-area-inset-*) fire on notched iPhones.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
