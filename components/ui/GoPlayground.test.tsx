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
