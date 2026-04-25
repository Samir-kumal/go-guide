'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { languageList } from '@/lib/languages'

export function LanguageNav() {
  const pathname = usePathname()

  // Extract current language from URL: /go/section -> go
  const currentLang = pathname.split('/')[1] || ''

  // Only show on docs pages (not home)
  if (!currentLang || !languageList.find(l => l.id === currentLang)) {
    return null
  }

  return (
    <nav className="flex gap-4 p-4 border-b border-[#ddd]">
      <span className="text-sm text-[#666]">Docs:</span>
      {languageList.map((lang) => (
        <Link
          key={lang.id}
          href={`/${lang.id}`}
          className={`text-sm font-medium px-3 py-1 rounded transition-colors ${
            currentLang === lang.id
              ? 'text-white'
              : 'text-[#666] hover:text-[#333]'
          }`}
          style={
            currentLang === lang.id
              ? { backgroundColor: lang.color }
              : undefined
          }
        >
          {lang.name}
        </Link>
      ))}
    </nav>
  )
}