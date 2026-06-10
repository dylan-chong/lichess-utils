import { parseDrawCommand } from '../../domain/commands/commandParser'
import type { Drawings3DState } from '../../presentation/3d/drawings3d'
import { draw3DAnnotations } from '../../presentation/3d/drawings3d'
import type { AnnotationsState } from '../../presentation/non-preact-components/annotations'
import { drawAnnotations } from '../../presentation/non-preact-components/annotations'
import type { CustomBoardState } from './handleCustomBoard'

export function handleDrawCommand(
  command: string,
  annotationsState: AnnotationsState,
  customBoardState: CustomBoardState,
  drawings3DState: Drawings3DState
): void {
  const annotations = parseDrawCommand(command)

  if (customBoardState.canvas) {
    draw3DAnnotations(customBoardState.canvas, drawings3DState, annotations)
  } else {
    drawAnnotations(annotationsState, annotations)
  }
}
