import { describe, expect, it } from 'vitest'
import { PieceType, PlayerColor } from '../constants'
import type { PiecePosition } from './pieceGrouping'
import { generateAllPiecesText, generateColorText, generateQuadrantText } from './speechText'

describe('generateQuadrantText', () => {
  it('generates text for multiple pieces of same type', () => {
    const pieces: PiecePosition[] = [
      { square: 'a2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'b2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
    ]

    const result = generateQuadrantText(pieces)
    expect(result).toBe('white pawns on a2, b2. a1 white rook.')
  })

  it('generates text for single pieces', () => {
    const pieces: PiecePosition[] = [
      { square: 'e1', color: PlayerColor.WHITE, type: PieceType.KING },
    ]

    const result = generateQuadrantText(pieces)
    expect(result).toBe('e1 white king.')
  })

  it('returns empty string when given no pieces', () => {
    const result = generateQuadrantText([])
    expect(result).toBe('')
  })
})

describe('generateAllPiecesText', () => {
  it('generates text for all pieces', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    ]

    const result = generateAllPiecesText(pieces)
    expect(result).toBe('a1 white rook. a8 black rook.')
  })
})

describe('generateColorText', () => {
  it('generates text for white pieces only', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    ]

    const result = generateColorText(pieces, PlayerColor.WHITE)
    expect(result).toBe('a1 white rook.')
  })

  it('generates text for black pieces only', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    ]

    const result = generateColorText(pieces, PlayerColor.BLACK)
    expect(result).toBe('a8 black rook.')
  })
})
