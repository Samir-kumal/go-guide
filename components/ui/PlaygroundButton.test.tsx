import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlaygroundButton } from './PlaygroundButton'

describe('PlaygroundButton', () => {
  it('renders a button with aria-label', () => {
    render(<PlaygroundButton onClick={() => {}} />)
    expect(screen.getByRole('button', { name: /open go playground/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handler = vi.fn()
    const user = userEvent.setup()
    render(<PlaygroundButton onClick={handler} />)
    await user.click(screen.getByRole('button', { name: /open go playground/i }))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
