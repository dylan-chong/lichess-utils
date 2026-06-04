import { type PiecePosition, groupByColorAndType } from '../domain/chess/pieceGrouping'

export function generateQuadrantText(pieces: PiecePosition[]): string {
  if (pieces.length === 0) return ''

  const groups = groupByColorAndType(pieces)
  const sentences: string[] = []

  for (const group of groups) {
    const colorName = group.color
    const typeName = group.squares.length > 1 ? `${group.type}s` : group.type

    if (group.squares.length > 1) {
      // Multiple pieces: "white pawns on a2, b2"
      const squares = group.squares.join(', ')
      sentences.push(`${colorName} ${typeName} on ${squares}`)
    } else {
      // Single piece: "e1 white king"
      sentences.push(`${group.squares[0]} ${colorName} ${group.type}`)
    }
  }

  return `${sentences.join('. ')}.`
}

export function generateAllPiecesText(pieces: PiecePosition[]): string {
  return generateQuadrantText(pieces)
}

export function generateColorText(pieces: PiecePosition[], color: 'white' | 'black'): string {
  const filtered = pieces.filter((p) => p.color === color)
  return generateQuadrantText(filtered)
}
