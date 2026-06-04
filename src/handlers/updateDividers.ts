import { type DividersState, hideDividers, showDividers } from '../dom/overlays/dividers'
import { settings } from '../settings/settingsStore'

export function updateDividers(state: DividersState): void {
  if (settings.dividersEnabled.value) {
    showDividers(state)
  } else {
    hideDividers(state)
  }
}
