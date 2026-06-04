import { effect } from '@preact/signals-core'
import type { DividersState } from '../adapters-overlays/dividers'
import { updateDividers } from '../application-handlers/updateDividers'
import type { SettingsStore } from '../application-settings/settingsStore'

export function setupDividersEffect(state: DividersState, settings: SettingsStore): () => void {
  return effect(() => {
    settings.dividersEnabled.value
    updateDividers(state, settings)
  })
}
