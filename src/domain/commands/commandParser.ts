import { AnnotationType } from '../../constants'

export type DrawAnnotation =
  | { type: AnnotationType.CIRCLE; square: string }
  | { type: AnnotationType.ARROW; from: string; to: string }

export function parseDrawCommand(command: string): DrawAnnotation[] {
  if (!command.startsWith('-')) return []

  const content = command.slice(1)
  if (!content) return []

  const parts = content.split(',')
  const annotations: DrawAnnotation[] = []

  for (const part of parts) {
    if (part.length === 2) {
      // Single square: circle
      annotations.push({ type: AnnotationType.CIRCLE, square: part })
    } else if (part.length === 4) {
      // Two squares: arrow
      const from = part.slice(0, 2)
      const to = part.slice(2, 4)
      annotations.push({ type: AnnotationType.ARROW, from, to })
    }
  }

  return annotations
}
