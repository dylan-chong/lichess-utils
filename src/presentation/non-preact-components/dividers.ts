import { CssClass, CssDisplay, DomSelector } from '../../constants/dom'
import { appendChild, createSvgElement, querySelector } from '../../platform/dom'

export interface DividersState {
  svg: SVGSVGElement
}

export function createDividers(): DividersState {
  const board = querySelector(DomSelector.BOARD)
  if (!board) {
    throw new Error('Board not found')
  }

  const rect = board.getBoundingClientRect()
  const size = rect.width

  const svg = createSvgElement('svg') as SVGSVGElement
  svg.setAttribute('class', CssClass.USERSCRIPT_DIVIDERS)
  svg.setAttribute('width', size.toString())
  svg.setAttribute('height', size.toString())
  svg.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    display: none;
  `

  // Vertical line
  const vLine = createSvgElement('line')
  vLine.setAttribute('x1', (size / 2).toString())
  vLine.setAttribute('y1', '0')
  vLine.setAttribute('x2', (size / 2).toString())
  vLine.setAttribute('y2', size.toString())
  vLine.setAttribute('stroke', 'red')
  vLine.setAttribute('stroke-width', '2')

  // Horizontal line
  const hLine = createSvgElement('line')
  hLine.setAttribute('x1', '0')
  hLine.setAttribute('y1', (size / 2).toString())
  hLine.setAttribute('x2', size.toString())
  hLine.setAttribute('y2', (size / 2).toString())
  hLine.setAttribute('stroke', 'red')
  hLine.setAttribute('stroke-width', '2')

  appendChild(svg, vLine)
  appendChild(svg, hLine)

  appendChild(board, svg)

  return { svg }
}

export function showDividers(state: DividersState): void {
  state.svg.style.display = CssDisplay.BLOCK
}

export function hideDividers(state: DividersState): void {
  state.svg.style.display = CssDisplay.NONE
}

export function destroyDividers(state: DividersState): void {
  state.svg.remove()
}
