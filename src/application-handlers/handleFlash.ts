import { type FlashOverlayState, hideFlash, showFlash } from '../adapters-overlays/flash'
import type { SettingsStore } from '../application-settings/settingsStore'

export function handleFlash(state: FlashOverlayState, settings: SettingsStore): void {
  hideFlash(state)

  const durationMs = settings.flashDuration.value * 1000

  setTimeout(() => {
    showFlash(state)
  }, durationMs)
}
