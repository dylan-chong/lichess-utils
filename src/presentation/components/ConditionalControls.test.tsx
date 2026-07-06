import { signal } from '@preact/signals'
import { render, screen } from '@testing-library/preact'
import { describe, expect, it } from 'vitest'
import { ConditionalControls } from './ConditionalControls'

describe('ConditionalControls', () => {
  it('renders children when condition is true', () => {
    render(
      <ConditionalControls condition={signal(true)}>
        <div>Test Content</div>
      </ConditionalControls>
    )

    expect(screen.getByText('Test Content')).toBeTruthy()
  })

  it('does not render children when condition is false', () => {
    render(
      <ConditionalControls condition={signal(false)}>
        <div>Hidden Content</div>
      </ConditionalControls>
    )

    expect(screen.queryByText('Hidden Content')).toBeNull()
  })

  it('applies indentation style when rendered', () => {
    const { container } = render(
      <ConditionalControls condition={signal(true)}>
        <div>Indented Content</div>
      </ConditionalControls>
    )

    const wrapper = container.querySelector('div')
    expect(wrapper).toBeTruthy()
    expect(wrapper?.style.marginLeft).toBe('16px')
  })

  it('returns null when condition is false', () => {
    const { container } = render(
      <ConditionalControls condition={signal(false)}>
        <div>Hidden</div>
      </ConditionalControls>
    )

    expect(container.firstChild).toBeNull()
  })
})
