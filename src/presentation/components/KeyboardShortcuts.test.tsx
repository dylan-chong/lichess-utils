import { render, screen } from '@testing-library/preact'
import { describe, expect, it } from 'vitest'
import { KeyboardShortcuts } from './KeyboardShortcuts'

describe('KeyboardShortcuts', () => {
  it('renders all keyboard shortcuts', () => {
    render(<KeyboardShortcuts />)

    // Verify speech command shortcuts are displayed
    expect(screen.getByText(/pwk/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/pwq/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/pbk/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/pbq/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/pww/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/pbb/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/pss/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/^pa/)).toBeInstanceOf(HTMLElement)

    // Verify drawing command shortcuts are displayed
    expect(screen.getByText(/-<square>/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/-<from><to>/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/-<sq1>,<sq2>/)).toBeInstanceOf(HTMLElement)
  })

  it('displays descriptions for each shortcut', () => {
    render(<KeyboardShortcuts />)

    expect(screen.getByText(/white kingside/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/white queenside/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/black kingside/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/black queenside/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/all white pieces/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/all black pieces/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/Stop speaking immediately/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/all pieces on the board/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/circle on a square/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/arrow between squares/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/multiple annotations/)).toBeInstanceOf(HTMLElement)
  })
})
