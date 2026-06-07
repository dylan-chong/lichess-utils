import { effect } from '@preact/signals-core'
import { applyBlur } from '../handlers/applyBlur'
import type { SettingsStore } from '../settings/settingsStore'

export function setupBlurEffect(settings: SettingsStore): () => void {
  return effect(() => {
    const obfuscationsEnabled = settings.obfuscationsEnabled.value
    const blur = settings.blur.value

    if (obfuscationsEnabled) {
      applyBlur(blur)
    } else {
      applyBlur(0)
    }
  })
}
