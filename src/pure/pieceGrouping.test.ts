import { describe, it, expect } from 'vitest'
import { filterQuadrant, groupByColorAndType } from './pieceGrouping'
import type { PiecePosition } from './pieceGrouping'

describe('filterQuadrant', () => {
  const pieces: PiecePosition[] = [
    { square: 'a1', color: 'white', type: 'rook' },
    { square: 'e1', color: 'white', type: 'king' },
    { square: 'a8', color: 'black', type: 'rook' },
    { square: 'e8', color: 'black', type: 'king' },
    { square: 'c3', color: 'white', type: 'pawn' },
    { square: 'f6', color: 'black', type: 'knight' },
  ]

  it('filters white king-side pieces (wk)', () => {
    const result = filterQuadrant(pieces, 'wk')
    expect(result).toEqual([
      { square: 'e1', color: 'white', type: 'king' },
    ])
  })

  it('filters white queen-side pieces (wq)', () => {
    const result = filterQuadrant(pieces, 'wq')
    expect(result).toEqual([
      { square: 'a1', color: 'white', type: 'rook' },
      { square: 'c3', color: 'white', type: 'pawn' },
    ])
  })

  it('filters black king-side pieces (bk)', () => {
    const result = filterQuadrant(pieces, 'bk')
    expect(result).toEqual([
      { square: 'e8', color: 'black', type: 'king' },
      { square: 'f6', color: 'black', type: 'knight' },
    ])
  })

  it('filters black queen-side pieces (bq)', () => {
    const result = filterQuadrant(pieces, 'bq')
    expect(result).toEqual([
      { square: 'a8', color: 'black', type: 'rook' },
    ])
  })

  it('throws for empty square', () => {
    expect(() =>
      filterQuadrant([{square: '', color: 'white', type: 'pawn'}], 'wk')
    ).toThrow('Invalid square format')
  })

  it('throws for single character square', () => {
    expect(() =>
      filterQuadrant([{square: 'a', color: 'white', type: 'pawn'}], 'wk')
    ).toThrow('Invalid square format')
  })

  it('throws for invalid file', () => {
    expect(() =>
      filterQuadrant([{square: 'z5', color: 'white', type: 'pawn'}], 'wk')
    ).toThrow('Invalid file')
  })

  it('throws for invalid rank', () => {
    expect(() =>
      filterQuadrant([{square: 'a9', color: 'white', type: 'pawn'}], 'wk')
    ).toThrow('Invalid rank')
  })
})

describe('groupByColorAndType', () => {
  it('groups pieces by color and type', () => {
    const pieces: PiecePosition[] = [
      { square: 'a2', color: 'white', type: 'pawn' },
      { square: 'b2', color: 'white', type: 'pawn' },
      { square: 'a1', color: 'white', type: 'rook' },
      { square: 'a7', color: 'black', type: 'pawn' },
      { square: 'a8', color: 'black', type: 'rook' },
    ]

    const result = groupByColorAndType(pieces)

    expect(result).toEqual([
      { color: 'white', type: 'pawn', squares: ['a2', 'b2'] },
      { color: 'white', type: 'rook', squares: ['a1'] },
      { color: 'black', type: 'pawn', squares: ['a7'] },
      { color: 'black', type: 'rook', squares: ['a8'] },
    ])
  })

  it('handles empty array', () => {
    const result = groupByColorAndType([])
    expect(result).toEqual([])
  })

  it('throws for missing square', () => {
    expect(() =>
      groupByColorAndType([{square: undefined as any, color: 'white', type: 'pawn'}])
    ).toThrow('Piece missing square property')
  })

  it('throws for missing color', () => {
    expect(() =>
      groupByColorAndType([{square: 'a1', color: undefined as any, type: 'pawn'}])
    ).toThrow('Piece missing color property')
  })

  it('throws for missing type', () => {
    expect(() =>
      groupByColorAndType([{square: 'a1', color: 'white', type: undefined as any}])
    ).toThrow('Piece missing type property')
  })
})
