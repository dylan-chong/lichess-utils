import { type DividersState, hideDividers, showDividers } from '../adapters-overlays/dividers'
import type { SettingsStore } from '../application-settings/settingsStore'

export function updateDividers(state: DividersState, settings: SettingsStore): void {
  if (settings.dividersEnabled.value) {
    showDividers(state)
  } else {
    hideDividers(state)
  }
}
