import { mockModule } from 'simone'
import { describe, expect, it } from 'vitest'
import type { MeditationLoopState } from '../handlers/handleMeditation'
import { createSettingsStore } from '../settings/settingsStore'
import { setupMeditationEffect } from './onMeditation'

const handleMeditation = mockModule(import('../handlers/handleMeditation'))

describe('setupMeditationEffect', () => {
  it('starts meditation loop when enabled', () => {
    const loopState: MeditationLoopState = { timeoutId: null, elapsedMs: 0 }
    const settings = createSettingsStore()

    handleMeditation.expects('startMeditationLoop').withArgs(loopState, settings).returns(undefined)

    settings.meditationEnabled.value = true

    const cleanup = setupMeditationEffect(loopState, settings)

    handleMeditation.expects('stopMeditationLoop').withArgs(loopState).returns(undefined)

    cleanup()
  })

  it('stops meditation loop when disabled', () => {
    const loopState: MeditationLoopState = { timeoutId: null, elapsedMs: 0 }
    const settings = createSettingsStore()

    handleMeditation.expects('stopMeditationLoop').withArgs(loopState).returns(undefined)

    settings.meditationEnabled.value = false

    const cleanup = setupMeditationEffect(loopState, settings)

    handleMeditation.expects('stopMeditationLoop').withArgs(loopState).returns(undefined)

    cleanup()
  })

  it('cleanup function is idempotent', () => {
    const loopState: MeditationLoopState = { timeoutId: null, elapsedMs: 0 }
    const settings = createSettingsStore()

    handleMeditation.expects('startMeditationLoop').withArgs(loopState, settings).returns(undefined)

    settings.meditationEnabled.value = true

    const cleanup = setupMeditationEffect(loopState, settings)

    handleMeditation.expects('stopMeditationLoop').withArgs(loopState).returns(undefined)
    handleMeditation.expects('stopMeditationLoop').withArgs(loopState).returns(undefined)

    cleanup()
    cleanup()

    expect(true).toBe(true)
  })
})
