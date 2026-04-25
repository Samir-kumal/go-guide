import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Programming Docs',
  description: 'Interactive guides for understanding programming languages and frameworks.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
