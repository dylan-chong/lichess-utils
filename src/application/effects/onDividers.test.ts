import { signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { afterEach, beforeEach, describe, it, vi } from 'vitest'
import type { DividersState } from '../../presentation/non-preact-components/dividers'
import { createSettingsStore } from '../settings/settingsStore'
import { setupDividersEffect } from './onDividers'

const updateDividers = mockModule(import('../handlers/updateDividers'))
const dividers = mockModule(import('../../presentation/non-preact-components/dividers'))

describe('onDividers effect', () => {
  const mockState: DividersState = {
    svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
    vLine: document.createElementNS('http://www.w3.org/2000/svg', 'line'),
    hLine: document.createElementNS('http://www.w3.org/2000/svg', 'line'),
  }
  const settings = createSettingsStore()
  const boardChanged = signal(0)

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calls updateDividers when dividersEnabled changes', () => {
    updateDividers.expects('updateDividers').withArgs(mockState, settings).returns(undefined)

    const cleanup = setupDividersEffect(mockState, settings, boardChanged)

    dividers.expects('resizeDividers').withArgs(mockState).returns(undefined)
    updateDividers.expects('updateDividers').withArgs(mockState, settings).returns(undefined)
    settings.dividersEnabled.value = true

    cleanup()
  })

  it('clears existing interval when effect re-runs', () => {
    settings.dividersEnabled.value = true
    dividers.expects('resizeDividers').withArgs(mockState).returns(undefined)
    updateDividers.expects('updateDividers').withArgs(mockState, settings).returns(undefined)

    const cleanup = setupDividersEffect(mockState, settings, boardChanged)

    updateDividers.expects('updateDividers').withArgs(mockState, settings).returns(undefined)
    settings.dividersEnabled.value = false

    cleanup()
  })

  it('periodically resizes dividers via interval', () => {
    settings.dividersEnabled.value = true
    dividers.expects('resizeDividers').withArgs(mockState).returns(undefined)
    updateDividers.expects('updateDividers').withArgs(mockState, settings).returns(undefined)

    const cleanup = setupDividersEffect(mockState, settings, boardChanged)

    dividers.expects('resizeDividers').withArgs(mockState).returns(undefined)
    vi.advanceTimersByTime(2000)

    cleanup()
  })
})
