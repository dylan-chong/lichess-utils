import { signal } from '@preact/signals'
import { render, screen } from '@testing-library/preact'
import { mockModule } from 'simone'
import { beforeEach, describe, expect, it } from 'vitest'
import { PieceType, PlayerColor } from '../../constants'
import type { PiecePosition } from '../../domain/chess/pieceGrouping'

const boardReaderMock = mockModule(import('../../application-services/boardReader'))
const pieceGroupingMock = mockModule(import('../../domain/chess/pieceGrouping'))

const { PiecesList } = await import('./PiecesList')

describe('PiecesList', () => {
  const boardChanged = signal(0)

  beforeEach(() => {
    boardChanged.value = 0
  })

  it('should display player color', () => {
    boardReaderMock.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    boardReaderMock.expects('readPiecePositions').withArgs().returns([])
    pieceGroupingMock.expects('groupByColorAndType').withArgs([]).returns([])

    render(<PiecesList boardChanged={boardChanged} />)

    expect(screen.getByText('You are: WHITE')).toBeTruthy()
  })

  it('should display grouped pieces by color', () => {
    const positions: PiecePosition[] = [
      { square: 'e2', color: PlayerColor.WHITE, type: PieceType.PAWN },
      { square: 'e7', color: PlayerColor.BLACK, type: PieceType.PAWN },
    ]

    boardReaderMock.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    boardReaderMock.expects('readPiecePositions').withArgs().returns(positions)
    pieceGroupingMock
      .expects('groupByColorAndType')
      .withArgs(positions)
      .returns([
        { color: PlayerColor.WHITE, type: PieceType.PAWN, squares: ['e2'] },
        { color: PlayerColor.BLACK, type: PieceType.PAWN, squares: ['e7'] },
      ])

    render(<PiecesList boardChanged={boardChanged} />)

    expect(screen.getByText('WHITE:')).toBeTruthy()
    expect(screen.getByText('pawn: e2')).toBeTruthy()
    expect(screen.getByText('BLACK:')).toBeTruthy()
    expect(screen.getByText('pawn: e7')).toBeTruthy()
  })

  it('should show "No pieces" when a color has no pieces', () => {
    boardReaderMock.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    boardReaderMock.expects('readPiecePositions').withArgs().returns([])
    pieceGroupingMock.expects('groupByColorAndType').withArgs([]).returns([])

    render(<PiecesList boardChanged={boardChanged} />)

    const noPiecesElements = screen.getAllByText('No pieces')
    expect(noPiecesElements).toHaveLength(2) // One for white, one for black
  })

  it('should update when boardChanged signal changes', () => {
    // First render
    boardReaderMock.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    boardReaderMock.expects('readPiecePositions').withArgs().returns([])
    pieceGroupingMock.expects('groupByColorAndType').withArgs([]).returns([])

    const { rerender } = render(<PiecesList boardChanged={boardChanged} />)

    expect(screen.getAllByText('No pieces')).toHaveLength(2)

    // Second render after signal change
    boardReaderMock.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    const newPositions: PiecePosition[] = [
      { square: 'e4', color: PlayerColor.WHITE, type: PieceType.PAWN },
    ]
    boardReaderMock.expects('readPiecePositions').withArgs().returns(newPositions)
    pieceGroupingMock
      .expects('groupByColorAndType')
      .withArgs(newPositions)
      .returns([{ color: PlayerColor.WHITE, type: PieceType.PAWN, squares: ['e4'] }])

    boardChanged.value = 1
    rerender(<PiecesList boardChanged={boardChanged} />)

    expect(screen.getByText('pawn: e4')).toBeTruthy()
  })

  it('should display multiple pieces of same type', () => {
    boardReaderMock.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
    boardReaderMock.expects('readPiecePositions').withArgs().returns([])
    pieceGroupingMock
      .expects('groupByColorAndType')
      .withArgs([])
      .returns([
        { color: PlayerColor.WHITE, type: PieceType.PAWN, squares: ['a2', 'b2', 'c2'] },
        { color: PlayerColor.WHITE, type: PieceType.KNIGHT, squares: ['b1', 'g1'] },
      ])

    render(<PiecesList boardChanged={boardChanged} />)

    expect(screen.getByText('pawn: a2, b2, c2')).toBeTruthy()
    expect(screen.getByText('knight: b1, g1')).toBeTruthy()
  })

  it('should show player as black', () => {
    boardReaderMock.expects('getPlayerColor').withArgs().returns(PlayerColor.BLACK)
    boardReaderMock.expects('readPiecePositions').withArgs().returns([])
    pieceGroupingMock.expects('groupByColorAndType').withArgs([]).returns([])

    render(<PiecesList boardChanged={boardChanged} />)

    expect(screen.getByText('You are: BLACK')).toBeTruthy()
  })
})
