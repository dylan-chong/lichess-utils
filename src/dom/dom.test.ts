import { describe, it, expect, beforeEach } from 'vitest'
import { createDiv, createSvgElement, querySelector, querySelectorAll, appendChild } from './dom'

describe('dom', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('createDiv returns a div element', () => {
    const div = createDiv()
    expect(div.tagName).toBe('DIV')
    expect(div instanceof HTMLDivElement).toBe(true)
  })

  it('createSvgElement returns an SVG element', () => {
    const svg = createSvgElement('svg')
    expect(svg.tagName).toBe('SVG')
    expect(svg instanceof SVGElement).toBe(true)
  })

  it('createSvgElement creates different SVG element types', () => {
    const line = createSvgElement('line')
    expect(line.tagName).toBe('LINE')
    expect(line instanceof SVGElement).toBe(true)
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

  it('querySelectorAll returns all matching elements', () => {
    document.body.innerHTML = '<div class="test"></div><div class="test"></div>'
    const elements = querySelectorAll('.test')
    expect(elements.length).toBe(2)
  })

  it('querySelectorAll returns empty NodeList when no matches', () => {
    const elements = querySelectorAll('.nonexistent')
    expect(elements.length).toBe(0)
  })

  it('appendChild appends child to parent', () => {
    const parent = document.createElement('div')
    const child = document.createElement('span')

    appendChild(parent, child)

    expect(parent.children.length).toBe(1)
    expect(parent.firstChild).toBe(child)
  })
})
