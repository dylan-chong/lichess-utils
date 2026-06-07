import { signal } from '@preact/signals-core'
import type { Signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { FlashOverlayState } from '../../presentation/non-preact-components/flash'
import type { FlashLoopState } from '../handlers/handleFlash'
import { createSettingsStore } from '../settings/settingsStore'
import { setupFlashEffect } from './onFlash'

const flash = mockModule(import('../../presentation/non-preact-components/flash'))
const handleFlash = mockModule(import('../handlers/handleFlash'))

describe('setupFlashEffect', () => {
  let mockOverlayState: FlashOverlayState
  let mockLoopState: FlashLoopState
  let settings: ReturnType<typeof createSettingsStore>
  let boardChanged: Signal<number>

  beforeEach(() => {
    mockOverlayState = { overlay: document.createElement('div') }
    mockLoopState = { intervalId: null, timeoutId: null }
    settings = createSettingsStore()
    boardChanged = signal<number>(0)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts flash loop when flash mode is enabled', () => {
    handleFlash
      .expects('startFlashLoop')
      .withArgs(mockOverlayState, mockLoopState, settings)
      .returns(undefined)

    settings.flashModeEnabled.value = true

    const cleanup = setupFlashEffect(mockOverlayState, mockLoopState, settings, boardChanged)

    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)

    cleanup()
  })

  it('stops flash loop and hides overlay when flash mode is disabled', () => {
    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)
    flash.expects('hideFlash').withArgs(mockOverlayState).returns(undefined)

    settings.flashModeEnabled.value = false

    const cleanup = setupFlashEffect(mockOverlayState, mockLoopState, settings, boardChanged)

    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)

    cleanup()
  })

  it('restarts flash loop when flash interval changes', () => {
    handleFlash
      .expects('startFlashLoop')
      .withArgs(mockOverlayState, mockLoopState, settings)
      .returns(undefined)

    settings.flashModeEnabled.value = true

    const cleanup = setupFlashEffect(mockOverlayState, mockLoopState, settings, boardChanged)

    handleFlash
      .expects('startFlashLoop')
      .withArgs(mockOverlayState, mockLoopState, settings)
      .returns(undefined)

    settings.flashInterval.value = 5

    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)

    cleanup()
  })

  it('restarts flash loop when flash duration changes', () => {
    handleFlash
      .expects('startFlashLoop')
      .withArgs(mockOverlayState, mockLoopState, settings)
      .returns(undefined)

    settings.flashModeEnabled.value = true

    const cleanup = setupFlashEffect(mockOverlayState, mockLoopState, settings, boardChanged)

    handleFlash
      .expects('startFlashLoop')
      .withArgs(mockOverlayState, mockLoopState, settings)
      .returns(undefined)

    settings.flashDuration.value = 1000

    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)

    cleanup()
  })

  it('triggers flash when board changes and flash mode is active', () => {
    settings.flashModeEnabled.value = true

    handleFlash
      .expects('startFlashLoop')
      .withArgs(mockOverlayState, mockLoopState, settings)
      .returns(undefined)

    const cleanup = setupFlashEffect(mockOverlayState, mockLoopState, settings, boardChanged)

    mockLoopState.intervalId = 123 as unknown as ReturnType<typeof setInterval>

    handleFlash
      .expects('triggerFlash')
      .withArgs(mockOverlayState, mockLoopState, settings)
      .returns(undefined)

    boardChanged.value++

    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)

    cleanup()
  })

  it('does not trigger flash when board changes and flash mode is inactive', () => {
    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)
    flash.expects('hideFlash').withArgs(mockOverlayState).returns(undefined)

    settings.flashModeEnabled.value = false

    const cleanup = setupFlashEffect(mockOverlayState, mockLoopState, settings, boardChanged)

    boardChanged.value++

    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)

    cleanup()
  })

  it('does not trigger flash when board changes and interval is not running', () => {
    handleFlash
      .expects('startFlashLoop')
      .withArgs(mockOverlayState, mockLoopState, settings)
      .returns(undefined)

    settings.flashModeEnabled.value = true
    mockLoopState.intervalId = null

    const cleanup = setupFlashEffect(mockOverlayState, mockLoopState, settings, boardChanged)

    boardChanged.value++

    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)

    cleanup()
  })

  it('returns cleanup function that stops effects and flash loop', () => {
    handleFlash
      .expects('startFlashLoop')
      .withArgs(mockOverlayState, mockLoopState, settings)
      .returns(undefined)

    settings.flashModeEnabled.value = true

    const cleanup = setupFlashEffect(mockOverlayState, mockLoopState, settings, boardChanged)

    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)

    cleanup()

    settings.flashModeEnabled.value = false
    boardChanged.value++
  })

  it('cleanup function is idempotent', () => {
    handleFlash
      .expects('startFlashLoop')
      .withArgs(mockOverlayState, mockLoopState, settings)
      .returns(undefined)

    settings.flashModeEnabled.value = true

    const cleanup = setupFlashEffect(mockOverlayState, mockLoopState, settings, boardChanged)

    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)
    handleFlash.expects('stopFlashLoop').withArgs(mockLoopState).returns(undefined)

    cleanup()
    cleanup()

    expect(true).toBe(true)
  })
})
