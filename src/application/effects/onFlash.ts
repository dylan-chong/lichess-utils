import { effect } from '@preact/signals-core'
import type { Signal } from '@preact/signals-core'
import type { FlashOverlayState } from '../../presentation/non-preact-components/flash'
import { hideFlash } from '../../presentation/non-preact-components/flash'
import {
  type FlashLoopState,
  startFlashLoop,
  stopFlashLoop,
  triggerFlash,
} from '../handlers/handleFlash'
import type { SettingsStore } from '../settings/settingsStore'

export function setupFlashEffect(
  overlayState: FlashOverlayState,
  loopState: FlashLoopState,
  settings: SettingsStore,
  boardChanged: Signal<number>
): () => void {
  const cleanupModeEffect = effect(() => {
    const enabled = settings.flashModeEnabled.value
    settings.flashInterval.value
    settings.flashDuration.value

    if (enabled) {
      startFlashLoop(overlayState, loopState, settings)
    } else {
      stopFlashLoop(loopState)
      hideFlash(overlayState)
    }
  })

  const cleanupBoardEffect = effect(() => {
    boardChanged.value
    if (settings.flashModeEnabled.value && loopState.intervalId !== null) {
      triggerFlash(overlayState, loopState, settings)
    }
  })

  return () => {
    cleanupModeEffect()
    cleanupBoardEffect()
    stopFlashLoop(loopState)
  }
}
