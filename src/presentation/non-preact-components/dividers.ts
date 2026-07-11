import { CssClass, CssDisplay, DomSelector } from '../../constants/dom'
import { appendChild, createSvgElement, querySelector } from '../../platform/dom'

export interface DividersState {
  svg: SVGSVGElement
  vLine: SVGElement
  hLine: SVGElement
}

export function createDividers(): DividersState {
  const svg = createSvgElement('svg') as SVGSVGElement
  svg.setAttribute('class', CssClass.USERSCRIPT_DIVIDERS)
  svg.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    display: none;
    z-index: 10;
  `

  const vLine = createSvgElement('line')
  vLine.setAttribute('stroke', 'black')
  vLine.setAttribute('stroke-width', '3')

  const hLine = createSvgElement('line')
  hLine.setAttribute('stroke', 'black')
  hLine.setAttribute('stroke-width', '3')

  appendChild(svg, vLine)
  appendChild(svg, hLine)

  const board = querySelector(DomSelector.BOARD)
  if (board) {
    appendChild(board, svg)
  }

  return { svg, vLine, hLine }
}

export function showDividers(state: DividersState): void {
  resizeDividers(state)
  state.svg.style.display = CssDisplay.BLOCK
}

export function hideDividers(state: DividersState): void {
  state.svg.style.display = CssDisplay.NONE
}

export function resizeDividers(state: DividersState): void {
  const board = querySelector(DomSelector.BOARD) as HTMLElement | null
  if (!board) return

  if (!board.contains(state.svg)) {
    appendChild(board, state.svg)
  }

  const rect = board.getBoundingClientRect()
  const size = rect.width

  state.svg.setAttribute('width', size.toString())
  state.svg.setAttribute('height', size.toString())

  state.vLine.setAttribute('x1', (size / 2).toString())
  state.vLine.setAttribute('y1', '0')
  state.vLine.setAttribute('x2', (size / 2).toString())
  state.vLine.setAttribute('y2', size.toString())

  state.hLine.setAttribute('x1', '0')
  state.hLine.setAttribute('y1', (size / 2).toString())
  state.hLine.setAttribute('x2', size.toString())
  state.hLine.setAttribute('y2', (size / 2).toString())
}

export function destroyDividers(state: DividersState): void {
  state.svg.remove()
}
