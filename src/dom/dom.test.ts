import { describe, it, expect, beforeEach } from 'vitest'
import { createDiv, querySelector, appendChild } from './dom'

describe('dom', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('createDiv returns a div element', () => {
    const div = createDiv()
    expect(div.tagName).toBe('DIV')
    expect(div instanceof HTMLDivElement).toBe(true)
  })

  it('querySelector returns element when found', () => {
    document.body.innerHTML = '<div class="test"></div>'
    const element = querySelector('.test')
    expect(element).not.toBeNull()
    expect(element?.className).toBe('test')
  })

  it('querySelector returns null when not found', () => {
    const element = querySelector('.nonexistent')
    expect(element).toBeNull()
  })

  it('appendChild appends child to parent', () => {
    const parent = document.createElement('div')
    const child = document.createElement('span')

    appendChild(parent, child)

    expect(parent.children.length).toBe(1)
    expect(parent.firstChild).toBe(child)
  })
})
