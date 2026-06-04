import { type PieceType, PlayerColor, Quadrant } from '../../constants'

export interface PiecePosition {
  square: string
  color: PlayerColor
  type: PieceType
}

export function filterQuadrant(pieces: PiecePosition[], quadrant: Quadrant): PiecePosition[] {
  return pieces.filter((piece) => {
    // Validate square format
    if (!piece.square || piece.square.length < 2) {
      throw new Error(`Invalid square format: ${piece.square}`)
    }

    const file = piece.square[0]
    const rank = Number.parseInt(piece.square[1], 10)

    // Validate file and rank
    if (file < 'a' || file > 'h') {
      throw new Error(`Invalid file: ${file}`)
    }
    if (Number.isNaN(rank) || rank < 1 || rank > 8) {
      throw new Error(`Invalid rank: ${rank}`)
    }

    // Determine file range (king-side: e-h, queen-side: a-d)
    const isKingSide = file >= 'e'

    // Determine rank range (white: 1-4, black: 5-8)
    const isWhiteRanks = rank >= 1 && rank <= 4

    // Match quadrant
    if (quadrant === Quadrant.WHITE_KING) return isKingSide && isWhiteRanks
    if (quadrant === Quadrant.WHITE_QUEEN) return !isKingSide && isWhiteRanks
    if (quadrant === Quadrant.BLACK_KING) return isKingSide && !isWhiteRanks
    if (quadrant === Quadrant.BLACK_QUEEN) return !isKingSide && !isWhiteRanks

    return false
  })
}

export interface GroupedPieces {
  color: PlayerColor
  type: string
  squares: string[]
}

export function groupByColorAndType(pieces: PiecePosition[]): GroupedPieces[] {
  const groups = new Map<string, GroupedPieces>()

  for (const piece of pieces) {
    // Validate required properties
    if (!piece.square) {
      throw new Error('Piece missing square property')
    }
    if (!piece.color) {
      throw new Error('Piece missing color property')
    }
    if (!piece.type) {
      throw new Error('Piece missing type property')
    }

    const key = `${piece.color}-${piece.type}`

    if (!groups.has(key)) {
      groups.set(key, {
        color: piece.color,
        type: piece.type,
        squares: [],
      })
    }

    groups.get(key)?.squares.push(piece.square)
  }

  // Sort groups by color (white first) then type
  return Array.from(groups.values()).sort((a, b) => {
    if (a.color !== b.color) {
      return a.color === PlayerColor.WHITE ? -1 : 1
    }
    return a.type.localeCompare(b.type)
  })
}
