import {
  type DividersState,
  hideDividers,
  showDividers,
} from '../../presentation/non-preact-components/dividers'
import type { SettingsStore } from '../settings/settingsStore'

export function updateDividers(state: DividersState, settings: SettingsStore): void {
  if (settings.dividersEnabled.value) {
    showDividers(state)
  } else {
    hideDividers(state)
  }
}
