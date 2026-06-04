import { mockModule } from 'simone'
import { describe, it } from 'vitest'
import type { DividersState } from '../adapters-overlays/dividers'
import { createSettingsStore } from '../application-settings/settingsStore'

const updateDividers = mockModule(import('../application-handlers/updateDividers'))
const { setupDividersEffect } = await import('./onDividers')

describe('onDividers effect', () => {
  const mockState: DividersState = {
    svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  }
  const settings = createSettingsStore()

  it('calls updateDividers when dividersEnabled changes', () => {
    updateDividers.expects('updateDividers').withArgs(mockState, settings).returns(undefined)

    const cleanup = setupDividersEffect(mockState, settings)

    updateDividers.expects('updateDividers').withArgs(mockState, settings).returns(undefined)
    settings.dividersEnabled.value = !settings.dividersEnabled.value

    cleanup()
  })
})
