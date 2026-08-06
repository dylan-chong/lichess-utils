import { describe, expect, it } from 'vitest'
import { PieceType, PlayerColor } from '../../constants/chess'
import type { PiecePosition } from '../chess/pieceGrouping'
import {
  generateAllPiecesSegments,
  generateAllPiecesText,
  generateColorSegments,
  generateColorText,
  generateQuadrantSegments,
  generateQuadrantText,
} from './speechText'

describe('generateQuadrantText', () => {
  it('generates text for multiple pieces of same type', () => {
    const pieces: PiecePosition[] = [
      { square: 'a2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'b2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
    ]

    const result = generateQuadrantText(pieces)
    expect(result).toBe('white pawns on a2 and b2. a1 white rook.')
  })

  it('generates text for three or more pieces of same type with Oxford comma', () => {
    const pieces: PiecePosition[] = [
      { square: 'a2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'b2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'e4', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]

    const result = generateQuadrantText(pieces)
    expect(result).toBe('white pawns on a2, b2, and e4.')
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

describe('generateQuadrantSegments', () => {
  it('produces one segment per square for multi-piece groups', () => {
    const pieces: PiecePosition[] = [
      { square: 'a2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'b2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'e4', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'e1', color: PlayerColor.WHITE, type: PieceType.KING },
    ]

    const result = generateQuadrantSegments(pieces)
    expect(result).toEqual(['white pawns on', 'a2', 'b2', 'and e4.', 'e1 white king.'])
  })

  it('returns empty array when given no pieces', () => {
    expect(generateQuadrantSegments([])).toEqual([])
  })
})

describe('generateAllPiecesSegments', () => {
  it('delegates to generateQuadrantSegments', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    ]

    expect(generateAllPiecesSegments(pieces)).toEqual(['a1 white rook.', 'a8 black rook.'])
  })
})

describe('generateColorSegments', () => {
  it('filters by color before segmenting', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    ]

    expect(generateColorSegments(pieces, PlayerColor.WHITE)).toEqual(['a1 white rook.'])
    expect(generateColorSegments(pieces, PlayerColor.BLACK)).toEqual(['a8 black rook.'])
  })
})
