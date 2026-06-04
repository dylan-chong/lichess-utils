import { describe, expect, it } from 'vitest'
import { PieceType, PlayerColor, Quadrant } from '../../constants/chess'
import { filterQuadrant, groupByColorAndType } from './pieceGrouping'
import type { PiecePosition } from './pieceGrouping'

describe('filterQuadrant', () => {
  const pieces: PiecePosition[] = [
    { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
    { square: 'e1', color: PlayerColor.WHITE, type: PieceType.KING },
    { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    { square: 'e8', color: PlayerColor.BLACK, type: PieceType.KING },
    { square: 'c3', color: PlayerColor.WHITE, type: PieceType.PAWN },
    { square: 'f6', color: PlayerColor.BLACK, type: PieceType.KNIGHT },
  ]

  it('filters white king-side pieces (wk)', () => {
    const result = filterQuadrant(pieces, Quadrant.WHITE_KING)
    expect(result).toEqual([{ square: 'e1', color: PlayerColor.WHITE, type: PieceType.KING }])
  })

  it('filters white queen-side pieces (wq)', () => {
    const result = filterQuadrant(pieces, Quadrant.WHITE_QUEEN)
    expect(result).toEqual([
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'c3', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ])
  })

  it('filters black king-side pieces (bk)', () => {
    const result = filterQuadrant(pieces, Quadrant.BLACK_KING)
    expect(result).toEqual([
      { square: 'e8', color: PlayerColor.BLACK, type: PieceType.KING },
      { square: 'f6', color: PlayerColor.BLACK, type: PieceType.KNIGHT },
    ])
  })

  it('filters black queen-side pieces (bq)', () => {
    const result = filterQuadrant(pieces, Quadrant.BLACK_QUEEN)
    expect(result).toEqual([{ square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK }])
  })

  it('throws for empty square', () => {
    expect(() =>
      filterQuadrant(
        [{ square: '', color: PlayerColor.WHITE, type: PieceType.PAWN }],
        Quadrant.WHITE_KING
      )
    ).toThrow('Invalid square format')
  })

  it('throws for single character square', () => {
    expect(() =>
      filterQuadrant(
        [{ square: 'a', color: PlayerColor.WHITE, type: PieceType.PAWN }],
        Quadrant.WHITE_KING
      )
    ).toThrow('Invalid square format')
  })

  it('throws for invalid file', () => {
    expect(() =>
      filterQuadrant(
        [{ square: 'z5', color: PlayerColor.WHITE, type: PieceType.PAWN }],
        Quadrant.WHITE_KING
      )
    ).toThrow('Invalid file')
  })

  it('throws for invalid rank', () => {
    expect(() =>
      filterQuadrant(
        [{ square: 'a9', color: PlayerColor.WHITE, type: PieceType.PAWN }],
        Quadrant.WHITE_KING
      )
    ).toThrow('Invalid rank')
  })
})

describe('groupByColorAndType', () => {
  it('groups pieces by color and type', () => {
    const pieces: PiecePosition[] = [
      { square: 'a2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'b2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
      { square: 'a7', color: PlayerColor.BLACK, type: PieceType.PAWN },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
    ]

    const result = groupByColorAndType(pieces)

    expect(result).toEqual([
      { color: PlayerColor.WHITE, type: PieceType.PAWN, squares: ['a2', 'b2'] },
      { color: PlayerColor.WHITE, type: PieceType.ROOK, squares: ['a1'] },
      { color: PlayerColor.BLACK, type: PieceType.PAWN, squares: ['a7'] },
      { color: PlayerColor.BLACK, type: PieceType.ROOK, squares: ['a8'] },
    ])
  })

  it('sorts white pieces before black pieces', () => {
    // Input with BLACK pieces before WHITE to test sorting
    const pieces: PiecePosition[] = [
      { square: 'a7', color: PlayerColor.BLACK, type: PieceType.PAWN },
      { square: 'a8', color: PlayerColor.BLACK, type: PieceType.ROOK },
      { square: 'a2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
    ]

    const result = groupByColorAndType(pieces)

    // WHITE groups should appear first
    expect(result[0].color).toBe(PlayerColor.WHITE)
    expect(result[1].color).toBe(PlayerColor.WHITE)
    expect(result[2].color).toBe(PlayerColor.BLACK)
    expect(result[3].color).toBe(PlayerColor.BLACK)
  })

  it('returns empty array when given no pieces', () => {
    const result = groupByColorAndType([])
    expect(result).toEqual([])
  })

  it('throws for missing square', () => {
    expect(() =>
      groupByColorAndType([
        { square: undefined as any, color: PlayerColor.WHITE, type: PieceType.PAWN },
      ])
    ).toThrow('Piece missing square property')
  })

  it('throws for missing color', () => {
    expect(() =>
      groupByColorAndType([{ square: 'a1', color: undefined as any, type: PieceType.PAWN }])
    ).toThrow('Piece missing color property')
  })

  it('throws for missing type', () => {
    expect(() =>
      groupByColorAndType([{ square: 'a1', color: PlayerColor.WHITE, type: undefined as any }])
    ).toThrow('Piece missing type property')
  })

  it('returns false for invalid quadrant value', () => {
    const pieces: PiecePosition[] = [
      { square: 'e4', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]

    // Cast invalid value to Quadrant type to test defensive fallback
    const result = filterQuadrant(pieces, 'invalid' as any)

    // Should filter out all pieces (return false for invalid quadrant)
    expect(result).toEqual([])
  })
})
