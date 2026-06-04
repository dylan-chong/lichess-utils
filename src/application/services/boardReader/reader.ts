import { CssClass, DomSelector, type PieceType, PlayerColor } from '../../../constants'
import { pixelsToSquare } from '../../../domain/chess/coordinates'
import type { PiecePosition } from '../../../domain/chess/pieceGrouping'
import { querySelector } from '../../../platform/dom'
import { extractBoardMetrics, extractPieceData } from './extraction'

export function getPlayerColor(): PlayerColor {
  const coords = querySelector(DomSelector.COORDS)
  return coords?.classList.contains(CssClass.BLACK) ? PlayerColor.BLACK : PlayerColor.WHITE
}

export function readPiecePositions(): PiecePosition[] {
  const board = querySelector(DomSelector.BOARD_NO_CUSTOM)
  if (!board) return []

  const { squareSize } = extractBoardMetrics(board as HTMLElement)
  const playerColor = getPlayerColor()

  const pieces = board.querySelectorAll(DomSelector.PIECE)
  const positions: PiecePosition[] = []

  for (const piece of pieces) {
    const rawData = extractPieceData(piece, squareSize)
    if (!rawData) continue

    // Map to enums
    const color = rawData.color === 'white' ? PlayerColor.WHITE : PlayerColor.BLACK
    const type = rawData.type as PieceType

    const square = pixelsToSquare({ x: rawData.x, y: rawData.y }, squareSize, playerColor)
    positions.push({ square, color, type })
  }

  return positions
}
