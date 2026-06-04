import { beforeEach, describe, expect, it } from 'vitest'
import { extractBoardMetrics, extractPieceData } from './extraction'

describe('extractBoardMetrics', () => {
  it('extracts board width and square size from style', () => {
    const board = document.createElement('div')
    board.style.cssText = 'width: 624px'

    const result = extractBoardMetrics(board)

    expect(result.boardWidth).toBe(624)
    expect(result.squareSize).toBe(78)
  })

  it('uses getBoundingClientRect when no width style present', () => {
    const board = document.createElement('div')
    document.body.appendChild(board)

    const result = extractBoardMetrics(board)

    expect(result.boardWidth).toBeDefined()
    expect(result.squareSize).toBe(result.boardWidth / 8)
  })
})

describe('extractPieceData', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('extracts piece data from element', () => {
    const piece = document.createElement('div')
    piece.className = 'white pawn'
    piece.style.transform = 'translate(100px, 200px)'

    const result = extractPieceData(piece, 78)

    expect(result).toEqual({
      color: 'white',
      type: 'pawn',
      x: 139,
      y: 161,
    })
  })

  it('returns null when color or type missing', () => {
    const piece = document.createElement('div')
    piece.className = 'white'
    piece.style.transform = 'translate(100px, 200px)'

    const result = extractPieceData(piece, 78)

    expect(result).toBeNull()
  })

  it('returns null when transform is malformed', () => {
    const piece = document.createElement('div')
    piece.className = 'white pawn'
    piece.style.transform = 'rotate(45deg)'

    const result = extractPieceData(piece, 78)

    expect(result).toBeNull()
  })
})
