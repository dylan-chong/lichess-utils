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
        <piece class="white pawn" style="transform: translate(0px, 468px)"></piece>
        <piece class="white rook" style="transform: translate(0px, 546px)"></piece>
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
        <piece class="black pawn" style="transform: translate(0px, 156px)"></piece>
        <piece class="black knight" style="transform: translate(78px, 78px)"></piece>
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
        <piece class="white pawn" style="transform: translate(0px, 468px)"></piece>
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
        <piece class="white rook" style="transform: translate(0px, 546px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()

    // Only the rook with valid transform should be included
    expect(result).toEqual([{ square: 'a1', color: PlayerColor.WHITE, type: PieceType.ROOK }])
  })

  it('reads full board from black perspective', () => {
    document.body.innerHTML = `
      <cg-board style="width: 544px">
        <piece class="black pawn" style="transform: translate(476px, 408px)"></piece>
        <piece class="black pawn" style="transform: translate(408px, 408px)"></piece>
        <piece class="black king" style="transform: translate(0px, 408px)"></piece>
        <piece class="black pawn" style="transform: translate(0px, 340px)"></piece>
        <piece class="white pawn" style="transform: translate(340px, 272px)"></piece>
        <piece class="white king" style="transform: translate(272px, 340px)"></piece>
        <piece class="black pawn" style="transform: translate(68px, 272px)"></piece>
        <piece class="white bishop" style="transform: translate(136px, 204px)"></piece>
        <piece class="white pawn" style="transform: translate(408px, 136px)"></piece>
        <piece class="white pawn" style="transform: translate(476px, 68px)"></piece>
      </cg-board>
      <coords class="black"></coords>
    `

    const result = readPiecePositions()
    const resultMap = new Map(result.map((p) => [p.square, { role: p.type, color: p.color }]))

    expect(resultMap.get('a7')).toEqual({ role: PieceType.PAWN, color: PlayerColor.BLACK })
    expect(resultMap.get('b7')).toEqual({ role: PieceType.PAWN, color: PlayerColor.BLACK })
    expect(resultMap.get('h7')).toEqual({ role: PieceType.KING, color: PlayerColor.BLACK })
    expect(resultMap.get('h6')).toEqual({ role: PieceType.PAWN, color: PlayerColor.BLACK })
    expect(resultMap.get('c5')).toEqual({ role: PieceType.PAWN, color: PlayerColor.WHITE })
    expect(resultMap.get('d6')).toEqual({ role: PieceType.KING, color: PlayerColor.WHITE })
    expect(resultMap.get('g5')).toEqual({ role: PieceType.PAWN, color: PlayerColor.BLACK })
    expect(resultMap.get('f4')).toEqual({ role: PieceType.BISHOP, color: PlayerColor.WHITE })
    expect(resultMap.get('b3')).toEqual({ role: PieceType.PAWN, color: PlayerColor.WHITE })
    expect(resultMap.get('a2')).toEqual({ role: PieceType.PAWN, color: PlayerColor.WHITE })
  })

  it('reads full board from white perspective', () => {
    document.body.innerHTML = `
      <cg-board style="width: 544px">
        <piece class="black rook" style="transform: translate(136px, 0px)"></piece>
        <piece class="black rook" style="transform: translate(340px, 68px)"></piece>
        <piece class="black king" style="transform: translate(476px, 0px)"></piece>
        <piece class="black pawn" style="transform: translate(408px, 68px)"></piece>
        <piece class="black pawn" style="transform: translate(476px, 68px)"></piece>
        <piece class="black pawn" style="transform: translate(0px, 136px)"></piece>
        <piece class="white knight" style="transform: translate(204px, 204px)"></piece>
        <piece class="white pawn" style="transform: translate(272px, 204px)"></piece>
        <piece class="white queen" style="transform: translate(340px, 204px)"></piece>
        <piece class="black pawn" style="transform: translate(136px, 272px)"></piece>
        <piece class="white pawn" style="transform: translate(476px, 340px)"></piece>
        <piece class="white pawn" style="transform: translate(0px, 408px)"></piece>
        <piece class="black queen" style="transform: translate(68px, 408px)"></piece>
        <piece class="white pawn" style="transform: translate(136px, 408px)"></piece>
        <piece class="white pawn" style="transform: translate(408px, 408px)"></piece>
        <piece class="white king" style="transform: translate(476px, 476px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()
    const resultMap = new Map(result.map((p) => [p.square, { role: p.type, color: p.color }]))

    expect(resultMap.get('c8')).toEqual({ role: PieceType.ROOK, color: PlayerColor.BLACK })
    expect(resultMap.get('h8')).toEqual({ role: PieceType.KING, color: PlayerColor.BLACK })
    expect(resultMap.get('f7')).toEqual({ role: PieceType.ROOK, color: PlayerColor.BLACK })
    expect(resultMap.get('g7')).toEqual({ role: PieceType.PAWN, color: PlayerColor.BLACK })
    expect(resultMap.get('h7')).toEqual({ role: PieceType.PAWN, color: PlayerColor.BLACK })
    expect(resultMap.get('a6')).toEqual({ role: PieceType.PAWN, color: PlayerColor.BLACK })
    expect(resultMap.get('d5')).toEqual({ role: PieceType.KNIGHT, color: PlayerColor.WHITE })
    expect(resultMap.get('e5')).toEqual({ role: PieceType.PAWN, color: PlayerColor.WHITE })
    expect(resultMap.get('f5')).toEqual({ role: PieceType.QUEEN, color: PlayerColor.WHITE })
    expect(resultMap.get('c4')).toEqual({ role: PieceType.PAWN, color: PlayerColor.BLACK })
    expect(resultMap.get('h3')).toEqual({ role: PieceType.PAWN, color: PlayerColor.WHITE })
    expect(resultMap.get('a2')).toEqual({ role: PieceType.PAWN, color: PlayerColor.WHITE })
    expect(resultMap.get('b2')).toEqual({ role: PieceType.QUEEN, color: PlayerColor.BLACK })
    expect(resultMap.get('c2')).toEqual({ role: PieceType.PAWN, color: PlayerColor.WHITE })
    expect(resultMap.get('g2')).toEqual({ role: PieceType.PAWN, color: PlayerColor.WHITE })
    expect(resultMap.get('h1')).toEqual({ role: PieceType.KING, color: PlayerColor.WHITE })
  })

  it('ignores pieces on userscript custom board', () => {
    document.body.innerHTML = `
      <cg-board class="userscript-custom-board">
        <piece class="white pawn" style="transform: translate(0px, 468px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()
    expect(result).toEqual([])
  })
})
