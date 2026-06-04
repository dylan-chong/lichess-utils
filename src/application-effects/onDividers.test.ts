import { mockModule } from 'simone'
import { describe, it } from 'vitest'
import type { DividersState } from '../adapters-overlays/dividers'
import { createSettingsStore } from '../application-settings/settingsStore'
import { setupDividersEffect } from './onDividers'

const updateDividers = mockModule(import('../application-handlers/updateDividers'))

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
