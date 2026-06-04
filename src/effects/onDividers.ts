import { effect } from '@preact/signals-core'
import { updateDividers } from '../handlers/updateDividers'
import { settings } from '../settings/settingsStore'
import type { DividersState } from '../dom/overlays/dividers'

export function setupDividersEffect(state: DividersState): () => void {
  return effect(() => {
    settings.dividersEnabled.value
    updateDividers(state)
  })
}
