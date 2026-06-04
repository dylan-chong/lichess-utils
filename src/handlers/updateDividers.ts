import { showDividers, hideDividers, type DividersState } from '../dom/overlays/dividers'
import { settings } from '../settings/settingsStore'

export function updateDividers(state: DividersState): void {
  if (settings.dividersEnabled.value) {
    showDividers(state)
  } else {
    hideDividers(state)
  }
}
