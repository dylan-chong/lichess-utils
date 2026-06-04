import { beforeEach, describe, expect, it } from 'vitest'
import { createFlashOverlay, destroyFlashOverlay, hideFlash, showFlash } from './flash'

describe('flash overlay', () => {
  beforeEach(() => {
    document.body.innerHTML = '<cg-container></cg-container>'
  })

  it('creates overlay element', () => {
    const state = createFlashOverlay()

    expect(state.overlay).toBeInstanceOf(HTMLElement)
    expect(state.overlay.className).toBe('userscript-flash-overlay')
  })

  it('shows overlay', () => {
    const state = createFlashOverlay()
    showFlash(state)

    expect(state.overlay.style.display).toBe('block')
  })

  it('hides overlay', () => {
    const state = createFlashOverlay()
    showFlash(state)
    hideFlash(state)

    expect(state.overlay.style.display).toBe('none')
  })

  it('creates overlay without appending when container is missing', () => {
    document.body.innerHTML = ''
    const state = createFlashOverlay()
    expect(state.overlay).toBeInstanceOf(HTMLElement)
    expect(state.overlay.parentElement).toBeNull()
  })

  it('removes overlay on destroy', () => {
    const state = createFlashOverlay()
    const parent = state.overlay.parentElement

    destroyFlashOverlay(state)

    expect(parent?.contains(state.overlay)).toBe(false)
  })
})
