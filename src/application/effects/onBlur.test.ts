import { mockModule } from 'simone'
import { describe, it } from 'vitest'
import { createSettingsStore } from '../settings/settingsStore'
import { setupBlurEffect } from './onBlur'

const applyBlurModule = mockModule(import('../handlers/applyBlur'))

describe('onBlur effect', () => {
  const settings = createSettingsStore()

  it('applies blur when obfuscations are enabled', () => {
    settings.obfuscationsEnabled.value = true
    settings.blur.value = 4

    applyBlurModule.expects('applyBlur').withArgs(4).returns(undefined)

    const cleanup = setupBlurEffect(settings)

    cleanup()
  })

  it('clears blur when obfuscations are disabled', () => {
    settings.obfuscationsEnabled.value = false
    settings.blur.value = 4

    applyBlurModule.expects('applyBlur').withArgs(0).returns(undefined)

    const cleanup = setupBlurEffect(settings)

    cleanup()
  })

  it('reacts to obfuscationsEnabled changes', () => {
    settings.obfuscationsEnabled.value = true
    settings.blur.value = 6

    applyBlurModule.expects('applyBlur').withArgs(6).returns(undefined)

    const cleanup = setupBlurEffect(settings)

    applyBlurModule.expects('applyBlur').withArgs(0).returns(undefined)

    settings.obfuscationsEnabled.value = false

    cleanup()
  })

  it('reacts to blur amount changes when obfuscations are enabled', () => {
    settings.obfuscationsEnabled.value = true
    settings.blur.value = 2

    applyBlurModule.expects('applyBlur').withArgs(2).returns(undefined)

    const cleanup = setupBlurEffect(settings)

    applyBlurModule.expects('applyBlur').withArgs(8).returns(undefined)

    settings.blur.value = 8

    cleanup()
  })

  it('does not react to blur changes when obfuscations are disabled', () => {
    settings.obfuscationsEnabled.value = false
    settings.blur.value = 2

    applyBlurModule.expects('applyBlur').withArgs(0).returns(undefined)

    const cleanup = setupBlurEffect(settings)

    applyBlurModule.expects('applyBlur').withArgs(0).returns(undefined)

    settings.blur.value = 8

    cleanup()
  })
})
