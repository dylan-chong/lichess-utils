import { type PiecePosition, groupByColorAndType } from '../chess/pieceGrouping'

function joinWithAnd(items: string[]): string {
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

export function generateQuadrantText(pieces: PiecePosition[]): string {
  if (pieces.length === 0) return ''

  const groups = groupByColorAndType(pieces)
  const sentences: string[] = []

  for (const group of groups) {
    const colorName = group.color
    const typeName = group.squares.length > 1 ? `${group.type}s` : group.type

    if (group.squares.length > 1) {
      // Multiple pieces: "white pawns on a2, b2, and c2"
      const squares = joinWithAnd(group.squares)
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

export function generateQuadrantSegments(pieces: PiecePosition[]): string[] {
  if (pieces.length === 0) return []

  const groups = groupByColorAndType(pieces)
  const segments: string[] = []

  for (const group of groups) {
    const colorName = group.color
    const typeName = group.squares.length > 1 ? `${group.type}s` : group.type

    if (group.squares.length > 1) {
      // Multiple pieces: "white pawns on a2" / "b2" / "and c2."
      segments.push(`${colorName} ${typeName} on ${group.squares[0]}`)
      for (const square of group.squares.slice(1, -1)) {
        segments.push(square)
      }
      segments.push(`and ${group.squares[group.squares.length - 1]}.`)
    } else {
      // Single piece: "e1 white king."
      segments.push(`${group.squares[0]} ${colorName} ${group.type}.`)
    }
  }

  return segments
}

export function generateAllPiecesSegments(pieces: PiecePosition[]): string[] {
  return generateQuadrantSegments(pieces)
}

export function generateColorSegments(pieces: PiecePosition[], color: 'white' | 'black'): string[] {
  const filtered = pieces.filter((p) => p.color === color)
  return generateQuadrantSegments(filtered)
}
