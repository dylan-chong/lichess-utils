import { beforeEach, describe, expect, it } from 'vitest'
import {
  appendChild,
  createCanvas,
  createDiv,
  createImage,
  createSvgElement,
  getBoundingClientRect,
  querySelector,
  querySelectorAll,
  waitForElement,
} from './dom'

describe('dom', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('createDiv returns a div element', () => {
    const div = createDiv()
    expect(div.tagName).toBe('DIV')
    expect(div instanceof HTMLDivElement).toBe(true)
  })

  it('createCanvas returns a canvas element', () => {
    const canvas = createCanvas()
    expect(canvas.tagName).toBe('CANVAS')
    expect(canvas instanceof HTMLCanvasElement).toBe(true)
  })

  it('createImage returns an image element', () => {
    const img = createImage()
    expect(img instanceof HTMLImageElement).toBe(true)
  })

  it('createSvgElement returns an SVG element', () => {
    const svg = createSvgElement('svg')
    expect(svg.tagName).toBe('svg')
    expect(svg instanceof SVGElement).toBe(true)
  })

  it('createSvgElement creates different SVG element types', () => {
    const line = createSvgElement('line')
    expect(line.tagName).toBe('line')
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

  it('getBoundingClientRect returns element bounds', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const rect = getBoundingClientRect(div)

    expect(rect).toBeDefined()
    expect(typeof rect.width).toBe('number')
    expect(typeof rect.height).toBe('number')
  })

  it('waitForElement resolves immediately if element exists', async () => {
    document.body.innerHTML = '<div class="test"></div>'

    const element = await waitForElement('.test')
    expect(element).toBeInstanceOf(Element)
  })

  it('waitForElement waits for element to be added', async () => {
    const promise = waitForElement('.test')

    setTimeout(() => {
      const div = document.createElement('div')
      div.className = 'test'
      document.body.appendChild(div)
    }, 10)

    const element = await promise
    expect(element).toBeInstanceOf(Element)
  })

  it('waitForElement resolves only after the target element is added, ignoring unrelated mutations', async () => {
    const promise = waitForElement('.target')

    const unrelated = document.createElement('span')
    document.body.appendChild(unrelated)

    await new Promise((r) => setTimeout(r, 10))
    const div = document.createElement('div')
    div.className = 'target'
    document.body.appendChild(div)

    const element = await promise
    expect(element).toBeInstanceOf(Element)
  })
})
