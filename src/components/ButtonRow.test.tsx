import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { signal } from '@preact/signals'
import { ButtonRow } from './ButtonRow'

describe('ButtonRow', () => {
  it('should render children when no visible signal provided', () => {
    render(
      <ButtonRow>
        <button>Test Button</button>
      </ButtonRow>
    )

    expect(screen.getByRole('button').textContent).toBe('Test Button')
  })

  it('should render children when visible signal is true', () => {
    const visible = signal(true)

    render(
      <ButtonRow visible={visible}>
        <button>Test Button</button>
      </ButtonRow>
    )

    expect(screen.getByRole('button').textContent).toBe('Test Button')
  })

  it('should not render children when visible signal is false', () => {
    const visible = signal(false)

    render(
      <ButtonRow visible={visible}>
        <button>Test Button</button>
      </ButtonRow>
    )

    expect(screen.queryByRole('button')).toBeNull()
  })

  it('should update visibility when signal changes', () => {
    const visible = signal(false)

    const { rerender } = render(
      <ButtonRow visible={visible}>
        <button>Test Button</button>
      </ButtonRow>
    )

    expect(screen.queryByRole('button')).toBeNull()

    visible.value = true
    rerender(
      <ButtonRow visible={visible}>
        <button>Test Button</button>
      </ButtonRow>
    )

    expect(screen.getByRole('button').textContent).toBe('Test Button')
  })

  it('should render multiple children', () => {
    render(
      <ButtonRow>
        <button>Button 1</button>
        <button>Button 2</button>
        <span>Text</span>
      </ButtonRow>
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].textContent).toBe('Button 1')
    expect(buttons[1].textContent).toBe('Button 2')
  })
})
