import { SpeakOrder } from '../../constants/options'
import {
  type PiecePosition,
  groupByColorAndType,
  groupByRankFileThenType,
} from '../chess/pieceGrouping'

function joinWithAnd(items: string[]): string {
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

function formatSquareForSpeech(square: string): string {
  return `${square[0].toUpperCase()}-${square[1]}`
}

export function generateQuadrantText(
  pieces: PiecePosition[],
  sortOrder: string = SpeakOrder.TypeRankFile
): string {
  if (pieces.length === 0) return ''

  const groups =
    sortOrder === SpeakOrder.RankFile
      ? groupByRankFileThenType(pieces)
      : groupByColorAndType(pieces)
  const sentences: string[] = []

  for (const group of groups) {
    const colorName = group.color
    const typeName = group.squares.length > 1 ? `${group.type}s` : group.type
    const spokenSquares = group.squares.map(formatSquareForSpeech)

    if (group.squares.length > 1) {
      // Multiple pieces: "white pawns on A-2, B-2, and C-2"
      const squares = joinWithAnd(spokenSquares)
      sentences.push(`${colorName} ${typeName} on ${squares}`)
    } else {
      // Single piece: "E-1 white king"
      sentences.push(`${spokenSquares[0]} ${colorName} ${group.type}`)
    }
  }

  return `${sentences.join('. ')}.`
}

export function generateAllPiecesText(
  pieces: PiecePosition[],
  sortOrder: string = SpeakOrder.TypeRankFile
): string {
  return generateQuadrantText(pieces, sortOrder)
}

export function generateColorText(
  pieces: PiecePosition[],
  color: 'white' | 'black',
  sortOrder: string = SpeakOrder.TypeRankFile
): string {
  const filtered = pieces.filter((p) => p.color === color)
  return generateQuadrantText(filtered, sortOrder)
}

export function generateQuadrantSegments(
  pieces: PiecePosition[],
  sortOrder: string = SpeakOrder.TypeRankFile
): string[] {
  if (pieces.length === 0) return []

  const groups =
    sortOrder === SpeakOrder.RankFile
      ? groupByRankFileThenType(pieces)
      : groupByColorAndType(pieces)
  const segments: string[] = []

  for (const group of groups) {
    const colorName = group.color
    const typeName = group.squares.length > 1 ? `${group.type}s` : group.type
    const spokenSquares = group.squares.map(formatSquareForSpeech)

    if (group.squares.length > 1) {
      // Multiple pieces: "white pawns on A-2" / "B-2" / "and C-2."
      segments.push(`${colorName} ${typeName} on ${spokenSquares[0]}`)
      for (const square of spokenSquares.slice(1, -1)) {
        segments.push(square)
      }
      segments.push(`and ${spokenSquares[spokenSquares.length - 1]}.`)
    } else {
      // Single piece: "E-1 white king."
      segments.push(`${spokenSquares[0]} ${colorName} ${group.type}.`)
    }
  }

  return segments
}

export function generateAllPiecesSegments(
  pieces: PiecePosition[],
  sortOrder: string = SpeakOrder.TypeRankFile
): string[] {
  return generateQuadrantSegments(pieces, sortOrder)
}

export function generateColorSegments(
  pieces: PiecePosition[],
  color: 'white' | 'black',
  sortOrder: string = SpeakOrder.TypeRankFile
): string[] {
  const filtered = pieces.filter((p) => p.color === color)
  return generateQuadrantSegments(filtered, sortOrder)
}

export function generateVoiceTestText(): string {
  const squares = joinWithAnd(['b2', 'd2'].map(formatSquareForSpeech))
  return `test pawns on ${squares}.`
}
