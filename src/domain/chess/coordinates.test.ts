import { describe, expect, it } from 'vitest'
import { PlayerColor } from '../../constants'
import { pixelsToSquare, squareToPixels } from './coordinates'

describe('pixelsToSquare', () => {
  it('converts pixels to square for white player', () => {
    // x=39 is center of 'a' file (column 0), y=507 is center of rank 2 (row 6)
    const result = pixelsToSquare(
      { x: 39, y: 507 },
      78, // squareSize (board width 624 / 8)
      PlayerColor.WHITE
    )
    expect(result).toBe('a2')
  })

  it('converts pixels to square for black player', () => {
    // For black, board is flipped: x=39 is center of 'h' file, y=507 is center of rank 7
    const result = pixelsToSquare({ x: 39, y: 507 }, 78, PlayerColor.BLACK)
    expect(result).toBe('h7')
  })

  it('returns correct square at board boundaries', () => {
    const result = pixelsToSquare({ x: 0, y: 0 }, 78, PlayerColor.WHITE)
    expect(result).toBe('a8')
  })
})

describe('squareToPixels', () => {
  it('converts square to pixels for white player', () => {
    const result = squareToPixels('e4', 78, PlayerColor.WHITE)
    // e4: column 4, rank 4
    // For white: row = 7 - (rank - 1) = 7 - 3 = 4
    // x = 4 * 78 + 39 = 351, y = 4 * 78 + 39 = 351
    expect(result).toEqual({ x: 351, y: 351 })
  })

  it('converts square to pixels for black player', () => {
    const result = squareToPixels('e4', 78, PlayerColor.BLACK)
    // e4: column 4, rank 4
    // For black: col flipped = 7 - 4 = 3
    // x = 3 * 78 + 39 = 273, y = (rank - 1) * 78 + 39 = 3 * 78 + 39 = 273
    expect(result).toEqual({ x: 273, y: 273 })
  })

  it('returns correct pixels for corner squares', () => {
    const result = squareToPixels('a1', 78, PlayerColor.WHITE)
    // a1: column 0, rank 1
    // For white: row = 7 - 0 = 7
    // x = 0 * 78 + 39 = 39, y = 7 * 78 + 39 = 585
    expect(result).toEqual({ x: 39, y: 585 })
  })
})

describe('squareToPixels validation', () => {
  it('throws for empty square string', () => {
    expect(() => squareToPixels('', 78, PlayerColor.WHITE)).toThrow('Invalid square notation')
  })

  it('throws for single character', () => {
    expect(() => squareToPixels('a', 78, PlayerColor.WHITE)).toThrow('Invalid square notation')
  })

  it('throws for invalid file', () => {
    expect(() => squareToPixels('z5', 78, PlayerColor.WHITE)).toThrow('Invalid file')
  })

  it('throws for invalid rank (too high)', () => {
    expect(() => squareToPixels('a9', 78, PlayerColor.WHITE)).toThrow('Invalid rank')
  })

  it('throws for invalid rank (too low)', () => {
    expect(() => squareToPixels('a0', 78, PlayerColor.WHITE)).toThrow('Invalid rank')
  })
})
