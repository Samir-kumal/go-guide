import { render, screen, fireEvent } from '@testing-library/react'
import { ConcurrencyDemo } from './ConcurrencyDemo'

describe('ConcurrencyDemo', () => {
  it('renders sequential and concurrent buttons', () => {
    render(<ConcurrencyDemo />)
    expect(screen.getByText(/Run Sequential/)).toBeInTheDocument()
    expect(screen.getByText(/Run Concurrent/)).toBeInTheDocument()
  })

  it('shows sequential output with 300ms on sequential click', () => {
    render(<ConcurrencyDemo />)
    fireEvent.click(screen.getByText(/Run Sequential/))
    expect(screen.getByText(/300ms/)).toBeInTheDocument()
  })

  it('shows concurrent output with 3x FASTER on concurrent click', () => {
    render(<ConcurrencyDemo />)
    fireEvent.click(screen.getByText(/Run Concurrent/))
    expect(screen.getByText(/3x FASTER/)).toBeInTheDocument()
  })

  it('hides result panel initially', () => {
    render(<ConcurrencyDemo />)
    expect(screen.queryByText(/300ms/)).not.toBeInTheDocument()
    expect(screen.queryByText(/3x FASTER/)).not.toBeInTheDocument()
  })
})
