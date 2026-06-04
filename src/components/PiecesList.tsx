import type { Signal } from '@preact/signals'
import { getPlayerColor, readPiecePositions } from '../dom/boardReader'
import { groupByColorAndType } from '../domain/chess/pieceGrouping'

interface PiecesListProps {
  boardChanged: Signal<number>
}

export function PiecesList({ boardChanged }: PiecesListProps) {
  // Subscribe to boardChanged signal to trigger re-renders
  boardChanged.value

  const playerColor = getPlayerColor()
  const positions = readPiecePositions()
  const grouped = groupByColorAndType(positions)

  // Group by color for display
  const whiteGroups = grouped.filter((g) => g.color === 'white')
  const blackGroups = grouped.filter((g) => g.color === 'black')

  return (
    <div>
      <div>You are: {playerColor.toUpperCase()}</div>
      <div>
        <strong>WHITE:</strong>
        {whiteGroups.length === 0 && <div>No pieces</div>}
        {whiteGroups.map((group) => (
          <div key={`${group.color}-${group.type}`}>
            {group.type}: {group.squares.join(', ')}
          </div>
        ))}
      </div>
      <div>
        <strong>BLACK:</strong>
        {blackGroups.length === 0 && <div>No pieces</div>}
        {blackGroups.map((group) => (
          <div key={`${group.color}-${group.type}`}>
            {group.type}: {group.squares.join(', ')}
          </div>
        ))}
      </div>
    </div>
  )
}
