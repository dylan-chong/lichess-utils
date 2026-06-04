import {
  type FlashOverlayState,
  hideFlash,
  showFlash,
} from '../../presentation/non-preact-components/flash'
import type { SettingsStore } from '../settings/settingsStore'

export function handleFlash(state: FlashOverlayState, settings: SettingsStore): void {
  hideFlash(state)

  const durationMs = settings.flashDuration.value * 1000

  setTimeout(() => {
    showFlash(state)
  }, durationMs)
}
