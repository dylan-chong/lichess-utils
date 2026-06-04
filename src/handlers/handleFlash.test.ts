import { mockModule } from 'simone'
import { beforeEach, describe, it, vi } from 'vitest'
import type { FlashOverlayState } from '../adapters-overlays/flash'
import { settings } from '../settings/settingsStore'

const flash = mockModule(import('../adapters-overlays/flash'))
const { handleFlash } = await import('./handleFlash')

describe('handleFlash', () => {
  let mockState: FlashOverlayState

  beforeEach(() => {
    mockState = {
      overlay: document.createElement('div'),
    }
    settings.flashDuration.value = 1
    vi.useFakeTimers()
  })

  it('hides flash immediately then shows after duration', () => {
    flash.expects('hideFlash').withArgs(mockState).returns(undefined)

    handleFlash(mockState)

    flash.expects('showFlash').withArgs(mockState).returns(undefined)
    vi.advanceTimersByTime(1000)
  })

  it('uses flash duration from settings', () => {
    settings.flashDuration.value = 2

    flash.expects('hideFlash').withArgs(mockState).returns(undefined)
    handleFlash(mockState)

    flash.expects('showFlash').withArgs(mockState).returns(undefined)
    vi.advanceTimersByTime(2000)
  })
})
