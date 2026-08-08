import { describe, expect, it } from 'vitest'
import { PieceType, PlayerColor } from '../../constants/chess'
import { SpeakOrder } from '../../constants/options'
import type { PiecePosition } from '../chess/pieceGrouping'
import {
  generateAllPiecesSegments,
  generateAllPiecesText,
  generateColorSegments,
  generateColorText,
  generateQuadrantSegments,
  generateQuadrantText,
  generateVoiceTestText,
} from './speechText'

describe('generateQuadrantText', () => {
  it('generates text for multiple pieces of same type', () => {
    const pieces: PiecePosition[] = [
      { square: 'a2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'b2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
    ]

    const result = generateQuadrantText(pieces)
    expect(result).toBe('white pawns on A-2 and B-2. A-1 white rook.')
  })

  it('generates text for three or more pieces of same type with Oxford comma', () => {
    const pieces: PiecePosition[] = [
      { square: 'a2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'b2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'e4', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]

    const result = generateQuadrantText(pieces)
    expect(result).toBe('white pawns on A-2, B-2, and E-4.')
  })

  it('generates text for single pieces', () => {
    const pieces: PiecePosition[] = [
      { square: 'e1', color: PlayerColor.WHITE, type: PieceType.KING },
    ]

    const result = generateQuadrantText(pieces)
    expect(result).toBe('E-1 white king.')
  })

  it('returns empty string when given no pieces', () => {
    const result = generateQuadrantText([])
    expect(result).toBe('')
  })

  it('groups by rank/file order, splitting runs interrupted by a different piece, when sortOrder is RankFile', () => {
    const pieces: PiecePosition[] = [
      { square: 'f2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'g2', color: PlayerColor.WHITE, type: PieceType.KNIGHT },
      { square: 'h2', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]

    const result = generateQuadrantText(pieces, SpeakOrder.RankFile)
    expect(result).toBe('F-2 white pawn. G-2 white knight. H-2 white pawn.')
  })

  it('merges consecutive same-type pieces in rank/file order when sortOrder is RankFile', () => {
    const pieces: PiecePosition[] = [
      { square: 'h2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'f2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'g2', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]

    const result = generateQuadrantText(pieces, SpeakOrder.RankFile)
    expect(result).toBe('white pawns on F-2, G-2, and H-2.')
  })
})

describe('generateAllPiecesText', () => {
  it('generates text for all pieces', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    ]

    const result = generateAllPiecesText(pieces)
    expect(result).toBe('A-1 white rook. A-8 black rook.')
  })

  it('forwards sortOrder to generateQuadrantText', () => {
    const pieces: PiecePosition[] = [
      { square: 'f2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'g2', color: PlayerColor.WHITE, type: PieceType.KNIGHT },
      { square: 'h2', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]

    const result = generateAllPiecesText(pieces, SpeakOrder.RankFile)
    expect(result).toBe('F-2 white pawn. G-2 white knight. H-2 white pawn.')
  })
})

describe('generateColorText', () => {
  it('generates text for white pieces only', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    ]

    const result = generateColorText(pieces, PlayerColor.WHITE)
    expect(result).toBe('A-1 white rook.')
  })

  it('generates text for black pieces only', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    ]

    const result = generateColorText(pieces, PlayerColor.BLACK)
    expect(result).toBe('A-8 black rook.')
  })

  it('forwards sortOrder to generateQuadrantText', () => {
    const pieces: PiecePosition[] = [
      { square: 'f2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'g2', color: PlayerColor.WHITE, type: PieceType.KNIGHT },
      { square: 'h2', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]

    const result = generateColorText(pieces, PlayerColor.WHITE, SpeakOrder.RankFile)
    expect(result).toBe('F-2 white pawn. G-2 white knight. H-2 white pawn.')
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
    expect(result).toEqual(['white pawns on A-2', 'B-2', 'and E-4.', 'E-1 white king.'])
  })

  it('returns empty array when given no pieces', () => {
    expect(generateQuadrantSegments([])).toEqual([])
  })

  it('groups by rank/file order, splitting runs interrupted by a different piece, when sortOrder is RankFile', () => {
    const pieces: PiecePosition[] = [
      { square: 'f2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'g2', color: PlayerColor.WHITE, type: PieceType.KNIGHT },
      { square: 'h2', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]

    const result = generateQuadrantSegments(pieces, SpeakOrder.RankFile)
    expect(result).toEqual(['F-2 white pawn.', 'G-2 white knight.', 'H-2 white pawn.'])
  })

  it('merges consecutive same-type pieces in rank/file order when sortOrder is RankFile', () => {
    const pieces: PiecePosition[] = [
      { square: 'h2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'f2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'g2', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]

    const result = generateQuadrantSegments(pieces, SpeakOrder.RankFile)
    expect(result).toEqual(['white pawns on F-2', 'G-2', 'and H-2.'])
  })
})

describe('generateAllPiecesSegments', () => {
  it('delegates to generateQuadrantSegments', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    ]

    expect(generateAllPiecesSegments(pieces)).toEqual(['A-1 white rook.', 'A-8 black rook.'])
  })

  it('forwards sortOrder to generateQuadrantSegments', () => {
    const pieces: PiecePosition[] = [
      { square: 'h2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'f2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'g2', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]

    expect(generateAllPiecesSegments(pieces, SpeakOrder.RankFile)).toEqual([
      'white pawns on F-2',
      'G-2',
      'and H-2.',
    ])
  })
})

describe('generateColorSegments', () => {
  it('filters by color before segmenting', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    ]

    expect(generateColorSegments(pieces, PlayerColor.WHITE)).toEqual(['A-1 white rook.'])
    expect(generateColorSegments(pieces, PlayerColor.BLACK)).toEqual(['A-8 black rook.'])
  })

  it('forwards sortOrder to generateQuadrantSegments', () => {
    const pieces: PiecePosition[] = [
      { square: 'h2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'f2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'g2', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]

    expect(generateColorSegments(pieces, PlayerColor.WHITE, SpeakOrder.RankFile)).toEqual([
      'white pawns on F-2',
      'G-2',
      'and H-2.',
    ])
  })
})

describe('generateVoiceTestText', () => {
  it('generates a fixed preview phrase for testing a selected voice', () => {
    expect(generateVoiceTestText()).toBe('test pawns on B-2 and D-2.')
  })
})
