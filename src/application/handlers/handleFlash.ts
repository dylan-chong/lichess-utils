import {
  type FlashOverlayState,
  hideFlash,
  showFlash,
} from '../../presentation/non-preact-components/flash'
import type { SettingsStore } from '../settings/settingsStore'

export interface FlashLoopState {
  intervalId: ReturnType<typeof setInterval> | null
  timeoutId: ReturnType<typeof setTimeout> | null
}

export function createFlashLoopState(): FlashLoopState {
  return { intervalId: null, timeoutId: null }
}

export function triggerFlash(
  overlayState: FlashOverlayState,
  loopState: FlashLoopState,
  settings: SettingsStore
): void {
  hideFlash(overlayState)

  if (loopState.timeoutId !== null) {
    clearTimeout(loopState.timeoutId)
  }

  const durationMs = settings.flashDuration.value

  loopState.timeoutId = setTimeout(() => {
    showFlash(overlayState)
    loopState.timeoutId = null
  }, durationMs)
}

export function startFlashLoop(
  overlayState: FlashOverlayState,
  loopState: FlashLoopState,
  settings: SettingsStore
): void {
  stopFlashLoop(loopState)

  showFlash(overlayState)

  triggerFlash(overlayState, loopState, settings)

  const intervalMs = settings.flashInterval.value * 1000
  loopState.intervalId = setInterval(() => {
    triggerFlash(overlayState, loopState, settings)
  }, intervalMs)
}

export function stopFlashLoop(loopState: FlashLoopState): void {
  if (loopState.intervalId !== null) {
    clearInterval(loopState.intervalId)
    loopState.intervalId = null
  }
  if (loopState.timeoutId !== null) {
    clearTimeout(loopState.timeoutId)
    loopState.timeoutId = null
  }
}
