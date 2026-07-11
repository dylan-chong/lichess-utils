import type { Signal } from '@preact/signals-core'
import { effect } from '@preact/signals-core'
import {
  type DividersState,
  resizeDividers,
} from '../../presentation/non-preact-components/dividers'
import { updateDividers } from '../handlers/updateDividers'
import type { SettingsStore } from '../settings/settingsStore'

const RESIZE_INTERVAL_MS = 2000

export function setupDividersEffect(
  state: DividersState,
  settings: SettingsStore,
  boardChanged: Signal<number>
): () => void {
  let intervalId: ReturnType<typeof setInterval> | null = null

  const cleanup = effect(() => {
    boardChanged.value
    const enabled = settings.dividersEnabled.value

    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }

    if (enabled) {
      resizeDividers(state)
      intervalId = setInterval(() => resizeDividers(state), RESIZE_INTERVAL_MS)
    }

    updateDividers(state, settings)
  })

  return () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
    }
    cleanup()
  }
}
