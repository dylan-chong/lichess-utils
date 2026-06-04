import { describe, it } from 'vitest'
import { mockModule } from 'simone'
import { settings } from '../settings/settingsStore'
import type { DividersState } from '../dom/overlays/dividers'

const dividers = mockModule(import('../dom/overlays/dividers'))
const { updateDividers } = await import('./updateDividers')

describe('updateDividers', () => {
  const mockState: DividersState = {
    svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  }

  it('shows dividers when enabled', () => {
    settings.dividersEnabled.value = true

    dividers.expects('showDividers').withArgs(mockState).returns(undefined)

    updateDividers(mockState)
  })

  it('hides dividers when disabled', () => {
    settings.dividersEnabled.value = false

    dividers.expects('hideDividers').withArgs(mockState).returns(undefined)

    updateDividers(mockState)
  })
})
