import { renderHook, act } from '@testing-library/react'
import { useSidebarScroll } from './useSidebarScroll'

describe('useSidebarScroll', () => {
  it('initializes with empty activeSection and 0 progress', () => {
    const { result } = renderHook(() => useSidebarScroll([]))
    expect(result.current.activeSection).toBe('')
    expect(result.current.progress).toBe(0)
  })

  it('updates progress on scroll', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 500, configurable: true })
    const { result } = renderHook(() => useSidebarScroll([]))
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 750, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current.progress).toBe(50)
  })

  it('cleans up scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useSidebarScroll([]))
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
