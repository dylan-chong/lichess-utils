import { effect } from '@preact/signals-core'
import type { Signal } from '@preact/signals-core'
import {
  type CustomBoardState,
  destroyCustomBoard,
  initCustomBoard,
  refreshPieces,
} from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'

export function setupCustomBoardEffect(
  state: CustomBoardState,
  settings: SettingsStore,
  boardChanged: Signal<number>
): () => void {
  const cleanupEnabled = effect(() => {
    const enabled = settings.customBoardEnabled.value
    if (enabled) {
      initCustomBoard(state, settings)
    } else {
      destroyCustomBoard(state)
    }
  })

  const cleanupBoardChange = effect(() => {
    boardChanged.value
    if (settings.customBoardEnabled.value && state.canvas) {
      refreshPieces(state, settings)
    }
  })

  return () => {
    cleanupEnabled()
    cleanupBoardChange()
    destroyCustomBoard(state)
  }
}
