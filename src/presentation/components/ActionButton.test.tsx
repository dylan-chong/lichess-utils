import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ActionButton } from './ActionButton'

describe('ActionButton', () => {
  it('renders button with label', () => {
    render(<ActionButton label="Test Button" onClick={() => {}} />)

    expect(screen.getByRole('button').textContent).toBe('Test Button')
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<ActionButton label="Click Me" onClick={handleClick} />)

    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has button type="button"', () => {
    render(<ActionButton label="Test" onClick={() => {}} />)

    const button = screen.getByRole('button')
    expect(button.getAttribute('type')).toBe('button')
  })
})
