import { mockModule } from 'simone'
import { describe, it } from 'vitest'
import type { DividersState } from '../../presentation/non-preact-components/dividers'
import { createSettingsStore } from '../settings/settingsStore'
import { updateDividers } from './updateDividers'

const dividers = mockModule(import('../../presentation/non-preact-components/dividers'))

describe('updateDividers', () => {
  const mockState: DividersState = {
    svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
    vLine: document.createElementNS('http://www.w3.org/2000/svg', 'line'),
    hLine: document.createElementNS('http://www.w3.org/2000/svg', 'line'),
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
