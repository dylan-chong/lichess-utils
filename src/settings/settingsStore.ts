import { effect, signal } from '@preact/signals-core'
import { defaultSettings } from './defaults'
import * as storage from './storage'
import type { Settings } from './types'

const STORAGE_KEY = 'lichess-board-speaker-settings'

export const settings = {
  speakRate: signal(defaultSettings.speakRate),
  piecesListEnabled: signal(defaultSettings.piecesListEnabled),
  dividersEnabled: signal(defaultSettings.dividersEnabled),
  customBoardEnabled: signal(defaultSettings.customBoardEnabled),
  obfuscationsEnabled: signal(defaultSettings.obfuscationsEnabled),
  parallax: signal(defaultSettings.parallax),
  hoverMode: signal(defaultSettings.hoverMode),
  pieceStyle: signal(defaultSettings.pieceStyle),
  blur: signal(defaultSettings.blur),
  blackSegments: signal(defaultSettings.blackSegments),
  blackSegmentsTiming: signal(defaultSettings.blackSegmentsTiming),
  flashModeEnabled: signal(defaultSettings.flashModeEnabled),
  flashDuration: signal(defaultSettings.flashDuration),
  flashInterval: signal(defaultSettings.flashInterval),
}

export function loadSettings(): void {
  const stored = storage.getItem(STORAGE_KEY)
  if (!stored) return

  const data = JSON.parse(stored) as Partial<Settings>
  for (const key of Object.keys(data)) {
    const settingKey = key as keyof Settings
    if (settings[settingKey]) {
      // biome-ignore lint/suspicious/noExplicitAny: Settings type is dynamic
      settings[settingKey].value = data[settingKey] as any
    }
  }
}

export function saveSettings(): void {
  const data: Partial<Settings> = {}
  for (const key of Object.keys(settings)) {
    const settingKey = key as keyof typeof settings
    // biome-ignore lint/suspicious/noExplicitAny: Settings type is dynamic
    data[settingKey] = settings[settingKey].value as any
  }
  storage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Auto-save effect (should be called once during app initialization)
export function setupAutoSave(): void {
  effect(() => {
    for (const s of Object.values(settings)) {
      s.value
    }
    saveSettings()
  })
}
