import { PlayerColor } from '../../constants'

export interface PixelPosition {
  x: number
  y: number
}

const FILES = 'abcdefgh'

export function pixelsToSquare(
  position: PixelPosition,
  squareSize: number,
  playerColor: PlayerColor
): string {
  // Convert pixels to grid indices (0-7)
  // Adjust for center-based coordinates before rounding
  let col = Math.round((position.x - squareSize / 2) / squareSize)
  let row = Math.round((position.y - squareSize / 2) / squareSize)

  // Clamp to valid range
  col = Math.max(0, Math.min(7, col))
  row = Math.max(0, Math.min(7, row))

  // Convert to rank based on player color
  // For white: y=0 is rank 8, y increases going to rank 1
  // For black: y=0 is rank 1, y increases going to rank 8
  let rank: number
  let file: string

  if (playerColor === PlayerColor.WHITE) {
    file = FILES[col]
    rank = 8 - row
  } else {
    file = FILES[7 - col]
    rank = row + 1
  }

  return `${file}${rank}`
}

export function squareToPixels(
  square: string,
  squareSize: number,
  playerColor: PlayerColor
): PixelPosition {
  // Validate square format
  if (square.length < 2) {
    throw new Error(`Invalid square notation: ${square}`)
  }

  // Parse square notation
  const file = square[0]
  const rank = Number.parseInt(square[1], 10)

  // Validate file and rank
  const col = FILES.indexOf(file)
  if (col === -1) {
    throw new Error(`Invalid file: ${file}`)
  }
  if (rank < 1 || rank > 8 || Number.isNaN(rank)) {
    throw new Error(`Invalid rank: ${rank}`)
  }

  // Calculate pixel position based on player color
  let pixelCol: number
  let pixelRow: number

  if (playerColor === PlayerColor.WHITE) {
    // For white: files go left-to-right (a-h), ranks go bottom-to-top (1-8)
    // So rank 1 is at bottom (row 7), rank 8 is at top (row 0)
    pixelCol = col
    pixelRow = 8 - rank
  } else {
    // For black: files go right-to-left (h-a), ranks go top-to-bottom (8-1)
    // So rank 8 is at top (row 0), rank 1 is at bottom (row 7)
    pixelCol = 7 - col
    pixelRow = rank - 1
  }

  // Convert to pixels (center of square)
  return {
    x: pixelCol * squareSize + squareSize / 2,
    y: pixelRow * squareSize + squareSize / 2,
  }
}
