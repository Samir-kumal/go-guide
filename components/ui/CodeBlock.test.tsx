import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CodeBlock } from './CodeBlock'

describe('CodeBlock', () => {
  it('renders code content inside pre', () => {
    render(<CodeBlock>const x = 1</CodeBlock>)
    expect(screen.getByText('const x = 1')).toBeInTheDocument()
  })

  it('renders copy button in idle state', () => {
    render(<CodeBlock>code</CodeBlock>)
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
  })

  it('shows Copied! after clicking copy button', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    })
    const user = userEvent.setup()
    render(<CodeBlock>some code</CodeBlock>)
    await user.click(screen.getByRole('button', { name: /copy/i }))
    expect(screen.getByText(/copied/i)).toBeInTheDocument()
  })
})
