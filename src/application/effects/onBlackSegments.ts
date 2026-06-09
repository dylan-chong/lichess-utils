import { effect } from '@preact/signals-core'
import {
  type BlackSegmentsState,
  applyBlackSegments,
  startBlackSegmentsInterval,
  stopBlackSegmentsInterval,
} from '../handlers/handleBlackSegments'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'

export function setupBlackSegmentsEffect(
  segState: BlackSegmentsState,
  customBoardState: CustomBoardState,
  settings: SettingsStore
): () => void {
  return effect(() => {
    const mode = settings.blackSegments.value
    void settings.blackSegmentsTiming.value // Subscribe to timing changes
    const obfuscationsEnabled = settings.obfuscationsEnabled.value

    if (!obfuscationsEnabled || mode === 'none' || !customBoardState.canvas) {
      stopBlackSegmentsInterval(segState)
      if (customBoardState.canvas) {
        applyBlackSegments(segState, customBoardState, settings)
      }
      return
    }

    applyBlackSegments(segState, customBoardState, settings)
    startBlackSegmentsInterval(segState, customBoardState, settings)
  })
}
