import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AnnotationType } from '../../constants/annotations'
import { CssClass } from '../../constants/dom'
import {
  clearAnnotations,
  createAnnotations,
  destroyAnnotations,
  drawAnnotations,
} from './annotations'

describe('annotations', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <cg-container>
        <cg-board style="width: 400px; height: 400px;"></cg-board>
      </cg-container>
    `
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('createAnnotations', () => {
    it('creates SVG element and appends to container', () => {
      const state = createAnnotations()

      expect(state.svg).toBeInstanceOf(SVGElement)
      expect(state.svg.tagName).toBe('svg')
      expect(state.svg.classList.contains(CssClass.USERSCRIPT_DRAWINGS)).toBe(true)

      const container = document.querySelector('cg-container')
      expect(container?.contains(state.svg)).toBe(true)
    })

    it('throws error when container element is not found', () => {
      document.body.innerHTML = '<cg-board></cg-board>' // Missing container

      expect(() => createAnnotations()).toThrow('Container not found')
    })

    it('throws error when board element is not found', () => {
      document.body.innerHTML = '<cg-container></cg-container>' // Missing board

      expect(() => createAnnotations()).toThrow('Board not found')
    })

    it('sets correct SVG dimensions based on board size', () => {
      const state = createAnnotations()

      // getBoundingClientRect returns 0 in test environment
      const width = state.svg.getAttribute('width')
      const height = state.svg.getAttribute('height')
      expect(typeof width).toBe('string')
      expect(typeof height).toBe('string')
      expect(width).toBe(height) // should be square
    })

    it('includes arrowhead marker definition', () => {
      const state = createAnnotations()

      const defs = state.svg.querySelector('defs')
      expect(defs).toBeInstanceOf(SVGElement)

      const marker = defs?.querySelector('#arrowhead')
      expect(marker).toBeInstanceOf(SVGElement)
    })
  })

  describe('drawAnnotations', () => {
    it('draws circle annotation', () => {
      const state = createAnnotations()
      const annotations = [{ type: AnnotationType.CIRCLE as const, square: 'e4' }]

      drawAnnotations(state, annotations)

      const circles = state.svg.querySelectorAll('circle')
      expect(circles.length).toBe(1)
      expect(circles[0].getAttribute('fill')).toBe('none')
      expect(circles[0].getAttribute('stroke')).toBe('red')
    })

    it('draws arrow annotation', () => {
      const state = createAnnotations()
      const annotations = [{ type: AnnotationType.ARROW as const, from: 'e2', to: 'e4' }]

      drawAnnotations(state, annotations)

      const lines = state.svg.querySelectorAll('line')
      expect(lines.length).toBe(1)
      expect(lines[0].getAttribute('stroke')).toBe('red')
      expect(lines[0].getAttribute('marker-end')).toBe('url(#arrowhead)')
    })

    it('draws multiple annotations', () => {
      const state = createAnnotations()
      const annotations = [
        { type: AnnotationType.CIRCLE as const, square: 'a1' },
        { type: AnnotationType.ARROW as const, from: 'b2', to: 'c3' },
        { type: AnnotationType.CIRCLE as const, square: 'd4' },
      ]

      drawAnnotations(state, annotations)

      const circles = state.svg.querySelectorAll('circle')
      const lines = state.svg.querySelectorAll('line')
      expect(circles.length).toBe(2)
      expect(lines.length).toBe(1)
    })

    it('clears previous annotations before drawing new ones', () => {
      const state = createAnnotations()

      drawAnnotations(state, [{ type: AnnotationType.CIRCLE as const, square: 'e4' }])
      expect(state.svg.querySelectorAll('circle').length).toBe(1)

      drawAnnotations(state, [{ type: AnnotationType.CIRCLE as const, square: 'a1' }])
      expect(state.svg.querySelectorAll('circle').length).toBe(1)
    })

    it('preserves defs when clearing', () => {
      const state = createAnnotations()

      drawAnnotations(state, [{ type: AnnotationType.ARROW as const, from: 'e2', to: 'e4' }])
      drawAnnotations(state, [{ type: AnnotationType.CIRCLE as const, square: 'a1' }])

      const defs = state.svg.querySelector('defs')
      expect(defs).toBeInstanceOf(SVGElement)
    })

    it('draws nothing when given empty annotations array', () => {
      const state = createAnnotations()

      drawAnnotations(state, [])

      const circles = state.svg.querySelectorAll('circle')
      const lines = state.svg.querySelectorAll('line')
      expect(circles.length).toBe(0)
      expect(lines.length).toBe(0)
    })

    it('skips drawing when board element is missing', () => {
      const state = createAnnotations()

      // Remove board element
      const board = document.querySelector('cg-board')
      board?.remove()

      // Should not throw
      drawAnnotations(state, [{ type: AnnotationType.CIRCLE as const, square: 'e4' }])

      // No circles should be drawn
      const circles = state.svg.querySelectorAll('circle')
      expect(circles.length).toBe(0)
    })

    it('ignores annotations with invalid type', () => {
      const state = createAnnotations()
      // Create an invalid annotation to test the else branch
      const invalidAnnotation = { type: 'invalid', square: 'e4' } as any

      drawAnnotations(state, [invalidAnnotation])

      // Should not draw anything for invalid type
      const circles = state.svg.querySelectorAll('circle')
      const lines = state.svg.querySelectorAll('line')
      expect(circles.length).toBe(0)
      expect(lines.length).toBe(0)
    })
  })

  describe('clearAnnotations', () => {
    it('removes all annotations', () => {
      const state = createAnnotations()
      drawAnnotations(state, [
        { type: AnnotationType.CIRCLE as const, square: 'e4' },
        { type: AnnotationType.ARROW as const, from: 'e2', to: 'e4' },
      ])

      clearAnnotations(state)

      const circles = state.svg.querySelectorAll('circle')
      const lines = state.svg.querySelectorAll('line')
      expect(circles.length).toBe(0)
      expect(lines.length).toBe(0)
    })

    it('preserves defs element', () => {
      const state = createAnnotations()
      drawAnnotations(state, [{ type: AnnotationType.ARROW as const, from: 'e2', to: 'e4' }])

      clearAnnotations(state)

      const defs = state.svg.querySelector('defs')
      expect(defs).toBeInstanceOf(SVGElement)
    })
  })

  describe('destroyAnnotations', () => {
    it('removes SVG from DOM', () => {
      const state = createAnnotations()
      const container = document.querySelector('cg-container')

      expect(container?.contains(state.svg)).toBe(true)

      destroyAnnotations(state)

      expect(container?.contains(state.svg)).toBe(false)
    })
  })
})
