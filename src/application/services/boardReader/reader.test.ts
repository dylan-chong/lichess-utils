import { beforeEach, describe, expect, it } from 'vitest'
import { PieceType, PlayerColor } from '../../../constants/chess'
import { getPlayerColor, readPiecePositions } from './reader'

describe('getPlayerColor', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('returns white when coords has no black class', () => {
    document.body.innerHTML = '<coords></coords>'
    expect(getPlayerColor()).toBe(PlayerColor.WHITE)
  })

  it('returns black when coords has black class', () => {
    document.body.innerHTML = '<coords class="black"></coords>'
    expect(getPlayerColor()).toBe(PlayerColor.BLACK)
  })

  it('returns white when coords element missing', () => {
    expect(getPlayerColor()).toBe(PlayerColor.WHITE)
  })
})

describe('readPiecePositions', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('reads piece positions for white player', () => {
    document.body.innerHTML = `
      <cg-board style="width: 624px">
        <piece class="white pawn" style="transform: translate(0px, 546px)"></piece>
        <piece class="white rook" style="transform: translate(0px, 624px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()

    expect(result).toEqual([
      { square: 'a2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK },
    ])
  })

  it('reads black pieces correctly', () => {
    document.body.innerHTML = `
      <cg-board style="width: 624px">
        <piece class="black pawn" style="transform: translate(0px, 234px)"></piece>
        <piece class="black knight" style="transform: translate(78px, 156px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()

    expect(result).toEqual([
      { square: 'a6', color: PlayerColor.BLACK, type: PieceType.PAWN },
      { square: 'b7', color: PlayerColor.BLACK, type: PieceType.KNIGHT },
    ])
  })

  it('uses getBoundingClientRect when no width style present', () => {
    document.body.innerHTML = `
      <cg-board>
        <piece class="white pawn" style="transform: translate(0px, 546px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()

    // Should still read pieces even without width style (uses getBoundingClientRect fallback)
    expect(result).toHaveLength(1)
  })

  it('skips pieces with malformed transform', () => {
    document.body.innerHTML = `
      <cg-board style="width: 624px">
        <piece class="white pawn" style="transform: rotate(45deg)"></piece>
        <piece class="white rook" style="transform: translate(0px, 624px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()

    // Only the rook with valid transform should be included
    expect(result).toEqual([{ square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK }])
  })

  it('ignores pieces on userscript custom board', () => {
    document.body.innerHTML = `
      <cg-board class="userscript-custom-board">
        <piece class="white pawn" style="transform: translate(0px, 546px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()
    expect(result).toEqual([])
  })
})
