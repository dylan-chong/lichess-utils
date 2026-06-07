import { parseDrawCommand } from '../../domain/commands/commandParser'
import type { AnnotationsState } from '../../presentation/non-preact-components/annotations'
import { drawAnnotations } from '../../presentation/non-preact-components/annotations'

export function handleDrawCommand(command: string, state: AnnotationsState): void {
  const annotations = parseDrawCommand(command)
  drawAnnotations(state, annotations)
}
