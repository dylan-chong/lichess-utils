import { signal, effect } from '@preact/signals-core'
import { defaultSettings } from './defaults'
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
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return

  const data = JSON.parse(stored) as Partial<Settings>
  Object.keys(data).forEach((key) => {
    const settingKey = key as keyof Settings
    if (settings[settingKey]) {
      settings[settingKey].value = data[settingKey] as any
    }
  })
}

export function saveSettings(): void {
  const data: Partial<Settings> = {}
  Object.keys(settings).forEach((key) => {
    const settingKey = key as keyof typeof settings
    data[settingKey] = settings[settingKey].value as any
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Auto-save effect (set up once)
effect(() => {
  Object.values(settings).forEach((s) => s.value)
  saveSettings()
})
