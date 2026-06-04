import { DomSelector, CssClass, CssDisplay } from '../../constants'

export interface DividersState {
  svg: SVGSVGElement
}

export function createDividers(): DividersState {
  const board = document.querySelector(DomSelector.BOARD)
  if (!board) {
    throw new Error('Board not found')
  }

  const rect = board.getBoundingClientRect()
  const size = rect.width

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
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
  const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  vLine.setAttribute('x1', (size / 2).toString())
  vLine.setAttribute('y1', '0')
  vLine.setAttribute('x2', (size / 2).toString())
  vLine.setAttribute('y2', size.toString())
  vLine.setAttribute('stroke', 'red')
  vLine.setAttribute('stroke-width', '2')

  // Horizontal line
  const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  hLine.setAttribute('x1', '0')
  hLine.setAttribute('y1', (size / 2).toString())
  hLine.setAttribute('x2', size.toString())
  hLine.setAttribute('y2', (size / 2).toString())
  hLine.setAttribute('stroke', 'red')
  hLine.setAttribute('stroke-width', '2')

  svg.appendChild(vLine)
  svg.appendChild(hLine)

  board.appendChild(svg)

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
