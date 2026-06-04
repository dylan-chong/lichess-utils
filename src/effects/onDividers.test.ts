import { describe, it } from 'vitest'
import { mockModule } from 'simone'
import { settings } from '../settings/settingsStore'
import type { DividersState } from '../dom/overlays/dividers'

const updateDividers = mockModule(import('../handlers/updateDividers'))
const { setupDividersEffect } = await import('./onDividers')

describe('onDividers effect', () => {
  const mockState: DividersState = {
    svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  }

  it('calls updateDividers when dividersEnabled changes', () => {
    updateDividers.expects('updateDividers').withArgs(mockState).returns(undefined)

    const cleanup = setupDividersEffect(mockState)

    updateDividers.expects('updateDividers').withArgs(mockState).returns(undefined)
    settings.dividersEnabled.value = !settings.dividersEnabled.value

    cleanup()
  })
})
