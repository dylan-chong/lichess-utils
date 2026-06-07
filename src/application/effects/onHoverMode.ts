import { effect } from '@preact/signals-core'
import { querySelector } from '../../platform/dom'
import { updateCameraAngle } from '../../presentation/3d/camera'
import { render3D } from '../../presentation/3d/canvas'
import {
  type HoverAnimationState,
  startHoverAnimation,
  stopHoverAnimation,
} from '../../presentation/3d/hoverAnimation'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'

const HOVER_SCALES: Record<string, number> = {
  off: 0,
  small: 1,
  large: 2,
  super: 3,
}

export function setupHoverModeEffect(
  customBoardState: CustomBoardState,
  hoverState: HoverAnimationState,
  settings: SettingsStore
): () => void {
  return effect(() => {
    const mode = settings.hoverMode.value
    const scale = HOVER_SCALES[mode] ?? 0

    if (!customBoardState.canvas) {
      stopHoverAnimation(hoverState)
      return
    }

    if (scale > 0) {
      if (settings.parallax.value === 0) {
        settings.parallax.value = 40
      }
      startHoverAnimation(hoverState, customBoardState.canvas, () => {
        const coords = querySelector('coords')
        const isFlipped = coords?.classList.contains('black') ?? false
        return { baseAngle: settings.parallax.value, scale, isFlipped }
      })
    } else {
      stopHoverAnimation(hoverState)
      const coords = querySelector('coords')
      const isFlipped = coords?.classList.contains('black') ?? false
      updateCameraAngle(customBoardState.canvas, settings.parallax.value, isFlipped)
      render3D(customBoardState.canvas)
    }
  })
}
