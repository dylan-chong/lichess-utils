import { describe, expect, it } from 'vitest'
import { PlayerColor, Quadrant } from '../../constants/chess'
import { getQuadrantAtScreenPosition, getQuadrantScreenPosition } from './quadrantLayout'

describe('getQuadrantScreenPosition', () => {
  it('maps white king-side to bottom-right for a white player', () => {
    expect(getQuadrantScreenPosition(Quadrant.WHITE_KING, PlayerColor.WHITE)).toBe('bottom-right')
  })

  it('maps white queen-side to bottom-left for a white player', () => {
    expect(getQuadrantScreenPosition(Quadrant.WHITE_QUEEN, PlayerColor.WHITE)).toBe('bottom-left')
  })

  it('maps black king-side to top-right for a white player', () => {
    expect(getQuadrantScreenPosition(Quadrant.BLACK_KING, PlayerColor.WHITE)).toBe('top-right')
  })

  it('maps black queen-side to top-left for a white player', () => {
    expect(getQuadrantScreenPosition(Quadrant.BLACK_QUEEN, PlayerColor.WHITE)).toBe('top-left')
  })

  it('maps white king-side to top-left for a black player', () => {
    expect(getQuadrantScreenPosition(Quadrant.WHITE_KING, PlayerColor.BLACK)).toBe('top-left')
  })

  it('maps white queen-side to top-right for a black player', () => {
    expect(getQuadrantScreenPosition(Quadrant.WHITE_QUEEN, PlayerColor.BLACK)).toBe('top-right')
  })

  it('maps black king-side to bottom-left for a black player', () => {
    expect(getQuadrantScreenPosition(Quadrant.BLACK_KING, PlayerColor.BLACK)).toBe('bottom-left')
  })

  it('maps black queen-side to bottom-right for a black player', () => {
    expect(getQuadrantScreenPosition(Quadrant.BLACK_QUEEN, PlayerColor.BLACK)).toBe('bottom-right')
  })
})

describe('getQuadrantAtScreenPosition', () => {
  it('is the inverse of getQuadrantScreenPosition for every quadrant and player color', () => {
    for (const playerColor of [PlayerColor.WHITE, PlayerColor.BLACK]) {
      for (const quadrant of Object.values(Quadrant)) {
        const position = getQuadrantScreenPosition(quadrant, playerColor)
        expect(getQuadrantAtScreenPosition(position, playerColor)).toBe(quadrant)
      }
    }
  })
})
