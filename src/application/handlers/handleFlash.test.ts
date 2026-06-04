import { mockModule } from 'simone'
import { beforeEach, describe, it, vi } from 'vitest'
import type { FlashOverlayState } from '../../presentation/non-preact-components/flash'
import { createSettingsStore } from '../settings/settingsStore'
import { handleFlash } from './handleFlash'

const flash = mockModule(import('../../presentation/non-preact-components/flash'))

describe('handleFlash', () => {
  let mockState: FlashOverlayState
  let settings: ReturnType<typeof createSettingsStore>

  beforeEach(() => {
    mockState = {
      overlay: document.createElement('div'),
    }
    settings = createSettingsStore()
    settings.flashDuration.value = 1
    vi.useFakeTimers()
  })

  it('hides flash immediately then shows after duration', () => {
    flash.expects('hideFlash').withArgs(mockState).returns(undefined)

    handleFlash(mockState, settings)

    flash.expects('showFlash').withArgs(mockState).returns(undefined)
    vi.advanceTimersByTime(1000)
  })

  it('uses flash duration from settings', () => {
    settings.flashDuration.value = 2

    flash.expects('hideFlash').withArgs(mockState).returns(undefined)
    handleFlash(mockState, settings)

    flash.expects('showFlash').withArgs(mockState).returns(undefined)
    vi.advanceTimersByTime(2000)
  })
})
