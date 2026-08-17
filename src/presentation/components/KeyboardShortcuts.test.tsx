import { render, screen } from '@testing-library/preact'
import { describe, expect, it } from 'vitest'
import { KeyboardShortcuts } from './KeyboardShortcuts'

describe('KeyboardShortcuts', () => {
  it('renders all keyboard shortcuts', () => {
    render(<KeyboardShortcuts />)

    // Verify all shortcuts are displayed
    expect(screen.getByText(/\*pwk\*/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/\*pwq\*/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/\*pbk\*/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/\*pbq\*/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/\*pww\*/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/\*pbb\*/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/\*pss\*/)).toBeInstanceOf(HTMLElement)
    expect(screen.getByText(/\*pa\*/)).toBeInstanceOf(HTMLElement)
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
  })
})
