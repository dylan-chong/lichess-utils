import { effect } from '@preact/signals-core'
import { DomSelector } from '../../constants/dom'
import { querySelector } from '../../platform/dom'
import { updateCameraAngle } from '../../presentation/3d/camera'
import { render3D } from '../../presentation/3d/canvas'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'

export function setupParallaxEffect(
  customBoardState: CustomBoardState,
  settings: SettingsStore
): () => void {
  return effect(() => {
    const angle = settings.parallax.value
    if (!customBoardState.canvas) return

    const coords = querySelector(DomSelector.COORDS)
    const isFlipped = coords?.classList.contains('black') ?? false

    updateCameraAngle(customBoardState.canvas, angle, isFlipped)
    render3D(customBoardState.canvas)
  })
}
