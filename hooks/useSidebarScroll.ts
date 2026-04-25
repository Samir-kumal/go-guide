import { useState, useEffect } from 'react'

export function useSidebarScroll(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // If no sections on the current page, don't do anything
    if (sectionIds.length === 0) return

    // Progress calculation remains based on scroll
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, Math.round((window.scrollY / docHeight) * 100)) : 0)
    }

    // Intersection Observer for active section tracking
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection('#' + entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [sectionIds.join(',')])

  return { activeSection, progress }
}
