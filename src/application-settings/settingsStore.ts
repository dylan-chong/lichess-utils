import type { Signal } from '@preact/signals-core'
import { effect, signal } from '@preact/signals-core'
import { type Settings, defaultSettings } from '../constants/settings'
import * as storage from '../platform/storage'

const STORAGE_KEY = 'lichess-board-speaker-settings'

export interface SettingsStore {
  speakRate: Signal<number>
  piecesListEnabled: Signal<boolean>
  dividersEnabled: Signal<boolean>
  customBoardEnabled: Signal<boolean>
  obfuscationsEnabled: Signal<boolean>
  parallax: Signal<number>
  hoverMode: Signal<string>
  pieceStyle: Signal<string>
  blur: Signal<number>
  blackSegments: Signal<string>
  blackSegmentsTiming: Signal<string>
  flashModeEnabled: Signal<boolean>
  flashDuration: Signal<number>
  flashInterval: Signal<number>
  loadSettings: () => void
  saveSettings: () => void
  setupAutoSave: () => void
}

export function createSettingsStore(): SettingsStore {
  const settings: SettingsStore = {
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

    loadSettings() {
      const stored = storage.getItem(STORAGE_KEY)
      if (!stored) return

      const data = JSON.parse(stored) as Partial<Settings>
      for (const key of Object.keys(data)) {
        const settingKey = key as keyof Settings
        if (
          settings[settingKey] &&
          typeof settings[settingKey] === 'object' &&
          'value' in settings[settingKey]
        ) {
          // biome-ignore lint/suspicious/noExplicitAny: Settings type is dynamic
          ;(settings[settingKey] as any).value = data[settingKey]
        }
      }
    },

    saveSettings() {
      const data: Partial<Settings> = {}
      for (const key of Object.keys(settings)) {
        const settingKey = key as keyof typeof settings
        if (typeof settings[settingKey] === 'object' && 'value' in settings[settingKey]) {
          // biome-ignore lint/suspicious/noExplicitAny: Settings type is dynamic
          data[settingKey as keyof Settings] = (settings[settingKey] as any).value
        }
      }
      storage.setItem(STORAGE_KEY, JSON.stringify(data))
    },

    setupAutoSave() {
      effect(() => {
        for (const key of Object.keys(settings)) {
          const setting = settings[key as keyof typeof settings]
          if (typeof setting === 'object' && 'value' in setting) {
            setting.value
          }
        }
        settings.saveSettings()
      })
    },
  }

  return settings
}
