import { useState, useEffect } from 'react'

export function useSidebarScroll(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, Math.round((window.scrollY / docHeight) * 100)) : 0)

      let current = ''
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) {
          current = '#' + id
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds.join(',')])

  return { activeSection, progress }
}
