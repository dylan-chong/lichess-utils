import { showFlash, hideFlash, type FlashOverlayState } from '../dom/overlays/flash'
import { settings } from '../settings/settingsStore'

export function handleFlash(state: FlashOverlayState): void {
  hideFlash(state)

  const durationMs = settings.flashDuration.value * 1000

  setTimeout(() => {
    showFlash(state)
  }, durationMs)
}
