import { describe, it, expect } from 'vitest'
import { generateQuadrantText, generateAllPiecesText, generateColorText } from './speechText'
import type { PiecePosition } from './pieceGrouping'

describe('generateQuadrantText', () => {
  it('generates text for multiple pieces of same type', () => {
    const pieces: PiecePosition[] = [
      { square: 'a2', color: 'white', type: 'pawn' },
      { square: 'b2', color: 'white', type: 'pawn' },
      { square: 'a1', color: 'white', type: 'rook' },
    ]

    const result = generateQuadrantText(pieces)
    expect(result).toBe('white pawns on a2, b2. a1 white rook.')
  })

  it('generates text for single pieces', () => {
    const pieces: PiecePosition[] = [
      { square: 'e1', color: 'white', type: 'king' },
    ]

    const result = generateQuadrantText(pieces)
    expect(result).toBe('e1 white king.')
  })

  it('handles empty array', () => {
    const result = generateQuadrantText([])
    expect(result).toBe('')
  })
})

describe('generateAllPiecesText', () => {
  it('generates text for all pieces', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: 'white', type: 'rook' },
      { square: 'a8', color: 'black', type: 'rook' },
    ]

    const result = generateAllPiecesText(pieces)
    expect(result).toBe('a1 white rook. a8 black rook.')
  })
})

describe('generateColorText', () => {
  it('generates text for white pieces only', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: 'white', type: 'rook' },
      { square: 'a8', color: 'black', type: 'rook' },
    ]

    const result = generateColorText(pieces, 'white')
    expect(result).toBe('a1 white rook.')
  })

  it('generates text for black pieces only', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: 'white', type: 'rook' },
      { square: 'a8', color: 'black', type: 'rook' },
    ]

    const result = generateColorText(pieces, 'black')
    expect(result).toBe('a8 black rook.')
  })
})
