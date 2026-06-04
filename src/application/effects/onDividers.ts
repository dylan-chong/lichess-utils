import { effect } from '@preact/signals-core'
import type { DividersState } from '../../presentation/non-preact-components/dividers'
import { updateDividers } from '../handlers/updateDividers'
import type { SettingsStore } from '../settings/settingsStore'

export function setupDividersEffect(state: DividersState, settings: SettingsStore): () => void {
  return effect(() => {
    settings.dividersEnabled.value
    updateDividers(state, settings)
  })
}
