import { AnnotationType } from '../../constants/annotations'
import { CssClass, DomSelector } from '../../constants/dom'
import type { DrawAnnotation } from '../../domain/commands/commandParser'
import { appendChild, createSvgElement, querySelector, removeElement } from '../../platform/dom'

export interface AnnotationsState {
  svg: SVGSVGElement
}

const ANNOTATION_COLOR = 'red'
const CIRCLE_RADIUS = 20
const ARROW_WIDTH = 3

function squareToPixelPosition(square: string, boardSize: number): { x: number; y: number } {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0) // 0-7
  const rank = Number.parseInt(square[1]) - 1 // 0-7

  const squareSize = boardSize / 8
  const x = file * squareSize + squareSize / 2
  const y = (7 - rank) * squareSize + squareSize / 2

  return { x, y }
}

function createCircle(square: string, boardSize: number): SVGCircleElement {
  const pos = squareToPixelPosition(square, boardSize)

  const circle = createSvgElement('circle') as SVGCircleElement
  circle.setAttribute('cx', pos.x.toString())
  circle.setAttribute('cy', pos.y.toString())
  circle.setAttribute('r', CIRCLE_RADIUS.toString())
  circle.setAttribute('fill', 'none')
  circle.setAttribute('stroke', ANNOTATION_COLOR)
  circle.setAttribute('stroke-width', '3')

  return circle
}

function createArrow(from: string, to: string, boardSize: number): SVGGElement {
  const fromPos = squareToPixelPosition(from, boardSize)
  const toPos = squareToPixelPosition(to, boardSize)

  const group = createSvgElement('g') as SVGGElement

  // Arrow line
  const line = createSvgElement('line')
  line.setAttribute('x1', fromPos.x.toString())
  line.setAttribute('y1', fromPos.y.toString())
  line.setAttribute('x2', toPos.x.toString())
  line.setAttribute('y2', toPos.y.toString())
  line.setAttribute('stroke', ANNOTATION_COLOR)
  line.setAttribute('stroke-width', ARROW_WIDTH.toString())
  line.setAttribute('marker-end', 'url(#arrowhead)')

  appendChild(group, line)

  return group
}

function createArrowheadMarker(): SVGDefsElement {
  const defs = createSvgElement('defs') as SVGDefsElement
  const marker = createSvgElement('marker') as SVGMarkerElement
  marker.setAttribute('id', 'arrowhead')
  marker.setAttribute('markerWidth', '10')
  marker.setAttribute('markerHeight', '10')
  marker.setAttribute('refX', '9')
  marker.setAttribute('refY', '3')
  marker.setAttribute('orient', 'auto')

  const polygon = createSvgElement('polygon')
  polygon.setAttribute('points', '0 0, 10 3, 0 6')
  polygon.setAttribute('fill', ANNOTATION_COLOR)

  appendChild(marker, polygon)
  appendChild(defs, marker)

  return defs
}

export function createAnnotations(): AnnotationsState {
  const container = querySelector(DomSelector.CONTAINER)
  if (!container) {
    throw new Error('Container not found')
  }

  const board = querySelector(DomSelector.BOARD)
  if (!board) {
    throw new Error('Board not found')
  }

  const rect = board.getBoundingClientRect()
  const size = rect.width

  const svg = createSvgElement('svg') as SVGSVGElement
  svg.setAttribute('class', CssClass.USERSCRIPT_DRAWINGS)
  svg.setAttribute('width', size.toString())
  svg.setAttribute('height', size.toString())
  svg.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 200;
  `

  // Add arrowhead marker definition
  const defs = createArrowheadMarker()
  appendChild(svg, defs)

  appendChild(container, svg)

  return { svg }
}

export function drawAnnotations(state: AnnotationsState, annotations: DrawAnnotation[]): void {
  // Clear existing annotations (except defs)
  const children = Array.from(state.svg.children)
  for (const child of children) {
    if (child.tagName !== 'defs') {
      removeElement(child as SVGElement)
    }
  }

  if (annotations.length === 0) return

  const board = querySelector(DomSelector.BOARD)
  if (!board) return

  const rect = board.getBoundingClientRect()
  const boardSize = rect.width

  // Draw each annotation
  for (const annotation of annotations) {
    if (annotation.type === AnnotationType.CIRCLE) {
      const circle = createCircle(annotation.square, boardSize)
      appendChild(state.svg, circle)
    } else if (annotation.type === AnnotationType.ARROW) {
      const arrow = createArrow(annotation.from, annotation.to, boardSize)
      appendChild(state.svg, arrow)
    }
  }
}

export function clearAnnotations(state: AnnotationsState): void {
  drawAnnotations(state, [])
}

export function destroyAnnotations(state: AnnotationsState): void {
  removeElement(state.svg)
}
