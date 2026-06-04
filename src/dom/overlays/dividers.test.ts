import { describe, it, expect, beforeEach } from 'vitest'
import { createDividers, showDividers, hideDividers, destroyDividers } from './dividers'

describe('dividers', () => {
  beforeEach(() => {
    document.body.innerHTML = '<cg-board style="width: 624px; height: 624px"></cg-board>'
  })

  it('creates SVG with lines', () => {
    const state = createDividers()

    expect(state.svg).toBeInstanceOf(SVGElement)
    expect(state.svg.getAttribute('class')).toBe('userscript-dividers')
  })

  it('shows dividers', () => {
    const state = createDividers()
    showDividers(state)

    expect(state.svg.style.display).toBe('block')
  })

  it('hides dividers', () => {
    const state = createDividers()
    showDividers(state)
    hideDividers(state)

    expect(state.svg.style.display).toBe('none')
  })

  it('removes SVG on destroy', () => {
    const state = createDividers()
    const parent = state.svg.parentElement

    destroyDividers(state)

    expect(parent?.contains(state.svg)).toBe(false)
  })

  it('throws error when board element not found', () => {
    document.body.innerHTML = '' // No board element

    expect(() => createDividers()).toThrow('Board not found')
  })
})
