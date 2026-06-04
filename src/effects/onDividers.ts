import { effect } from '@preact/signals-core'
import type { DividersState } from '../adapters-overlays/dividers'
import { updateDividers } from '../handlers/updateDividers'
import { settings } from '../settings/settingsStore'

export function setupDividersEffect(state: DividersState): () => void {
  return effect(() => {
    settings.dividersEnabled.value
    updateDividers(state)
  })
}
