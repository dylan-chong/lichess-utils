import { mockModule } from 'simone'
import { describe, it } from 'vitest'
import type { DividersState } from '../adapters-overlays/dividers'
import { createSettingsStore } from '../application-settings/settingsStore'

const dividers = mockModule(import('../adapters-overlays/dividers'))
const { updateDividers } = await import('./updateDividers')

describe('updateDividers', () => {
  const mockState: DividersState = {
    svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  }
  const settings = createSettingsStore()

  it('shows dividers when enabled', () => {
    settings.dividersEnabled.value = true

    dividers.expects('showDividers').withArgs(mockState).returns(undefined)

    updateDividers(mockState, settings)
  })

  it('hides dividers when disabled', () => {
    settings.dividersEnabled.value = false

    dividers.expects('hideDividers').withArgs(mockState).returns(undefined)

    updateDividers(mockState, settings)
  })
})
