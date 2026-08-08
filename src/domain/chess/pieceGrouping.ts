import { PIECE_TYPE_VALUES, type PieceType, PlayerColor, Quadrant } from '../../constants/chess'

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

  // Sort squares within each group by rank (1 first), then by file (a-h) within each rank
  for (const group of groups.values()) {
    group.squares.sort((a, b) => {
      const rankDiff = a[1].localeCompare(b[1])
      if (rankDiff !== 0) return rankDiff
      return a[0].localeCompare(b[0])
    })
  }

  // Sort groups by color (white first) then by piece type (pawn, knight, bishop, rook, queen, king)
  return Array.from(groups.values()).sort((a, b) => {
    if (a.color !== b.color) {
      return a.color === PlayerColor.WHITE ? -1 : 1
    }
    return (
      PIECE_TYPE_VALUES.indexOf(a.type as PieceType) -
      PIECE_TYPE_VALUES.indexOf(b.type as PieceType)
    )
  })
}

function compareByRankThenFile(a: PiecePosition, b: PiecePosition): number {
  const rankDiff = a.square[1].localeCompare(b.square[1])
  if (rankDiff !== 0) return rankDiff
  return a.square[0].localeCompare(b.square[0])
}

export function groupByRankFileThenType(pieces: PiecePosition[]): GroupedPieces[] {
  const sorted = [...pieces].sort(compareByRankThenFile)
  const groups: GroupedPieces[] = []

  for (const piece of sorted) {
    if (!piece.square) throw new Error('Piece missing square property')
    if (!piece.color) throw new Error('Piece missing color property')
    if (!piece.type) throw new Error('Piece missing type property')

    const lastGroup = groups[groups.length - 1]
    if (lastGroup && lastGroup.color === piece.color && lastGroup.type === piece.type) {
      lastGroup.squares.push(piece.square)
    } else {
      groups.push({ color: piece.color, type: piece.type, squares: [piece.square] })
    }
  }

  return groups
}
