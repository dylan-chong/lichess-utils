import { getBoundingClientRect } from '../../../platform/dom'

export interface RawPieceData {
  color: string
  type: string
  x: number
  y: number
}

export interface BoardMetrics {
  boardWidth: number
  squareSize: number
}

export function extractBoardMetrics(boardElement: HTMLElement): BoardMetrics {
  // Parse width from style attribute since getBoundingClientRect may not work in test environments
  const widthMatch = boardElement.style.cssText.match(/width:\s*([0-9.]+)px/)
  const boardWidth = widthMatch
    ? Number.parseFloat(widthMatch[1])
    : getBoundingClientRect(boardElement).width
  const squareSize = boardWidth / 8

  return { boardWidth, squareSize }
}

export function extractPieceData(pieceElement: Element, squareSize: number): RawPieceData | null {
  // Extract color and type from class
  const classes = pieceElement.className.split(' ')
  const colorStr = classes[0]
  const typeStr = classes[1]

  if (!colorStr || !typeStr) return null

  // Extract position from transform
  const transform = (pieceElement as HTMLElement).style.transform
  const match = transform.match(/translate\(([0-9.]+)px,?\s*([0-9.]+)px?\)/)
  if (!match) return null

  // Transform gives bottom-left corner, convert to center
  const x = Number.parseFloat(match[1]) + squareSize / 2
  const y = Number.parseFloat(match[2]) - squareSize / 2

  return {
    color: colorStr,
    type: typeStr,
    x,
    y,
  }
}
