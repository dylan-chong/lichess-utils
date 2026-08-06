import { effect } from '@preact/signals-core'
import {
  type MeditationLoopState,
  startMeditationLoop,
  stopMeditationLoop,
} from '../handlers/handleMeditation'
import type { SettingsStore } from '../settings/settingsStore'

export function setupMeditationEffect(
  loopState: MeditationLoopState,
  settings: SettingsStore
): () => void {
  const cleanupEffect = effect(() => {
    const enabled = settings.meditationEnabled.value

    if (enabled) {
      startMeditationLoop(loopState, settings)
    } else {
      stopMeditationLoop(loopState)
    }
  })

  return () => {
    cleanupEffect()
    stopMeditationLoop(loopState)
  }
}
