import { pixelsToSquare, type PlayerColor } from '../pure/coordinates'
import type { PiecePosition } from '../pure/pieceGrouping'

export function getPlayerColor(): PlayerColor {
  const coords = document.querySelector('coords')
  return coords?.classList.contains('black') ? 'black' : 'white'
}

export function readPiecePositions(): PiecePosition[] {
  const board = document.querySelector('cg-board:not(.userscript-custom-board)')
  if (!board) return []

  // Parse width from style attribute since getBoundingClientRect may not work in test environments
  const boardElement = board as HTMLElement
  const widthMatch = boardElement.style.cssText.match(/width:\s*([0-9.]+)px/)
  const boardWidth = widthMatch ? parseFloat(widthMatch[1]) : board.getBoundingClientRect().width
  const squareSize = boardWidth / 8
  const playerColor = getPlayerColor()

  const pieces = board.querySelectorAll('piece')
  const positions: PiecePosition[] = []

  for (const piece of pieces) {
    // Extract color and type from class
    const classes = piece.className.split(' ')
    const color = classes[0] as 'white' | 'black'
    const type = classes[1] as PiecePosition['type']

    // Extract position from transform
    const transform = (piece as HTMLElement).style.transform
    const match = transform.match(/translate\(([0-9.]+)px,?\s*([0-9.]+)px?\)/)
    if (!match) continue

    // Transform gives bottom-left corner, convert to center
    const x = parseFloat(match[1]) + squareSize / 2
    const y = parseFloat(match[2]) - squareSize / 2

    const square = pixelsToSquare({ x, y }, squareSize, playerColor)
    positions.push({ square, color, type })
  }

  return positions
}

export function waitForElement(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector)
    if (element) {
      resolve(element)
      return
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector)
      if (element) {
        observer.disconnect()
        resolve(element)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}
