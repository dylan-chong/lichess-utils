import { describe, it, expect, beforeEach } from 'vitest'
import { mockModule } from 'simone'
import { defaultSettings } from './defaults'

const storageMock = mockModule(import('./storage'))
const { settings, loadSettings, saveSettings, setupAutoSave } = await import('./settingsStore')

describe('settingsStore', () => {
  beforeEach(() => {
    Object.keys(settings).forEach((key) => {
      const settingKey = key as keyof typeof settings
      settings[settingKey].value = defaultSettings[settingKey] as any
    })
  })

  describe('loadSettings', () => {
    it('should load settings from storage', () => {
      const storedSettings = {
        speakRate: 1.5,
        piecesListEnabled: false,
        parallax: 20,
      }

      storageMock
        .expects('getItem')
        .withArgs('lichess-board-speaker-settings')
        .returns(JSON.stringify(storedSettings))

      loadSettings()

      expect(settings).toMatchObject({
        speakRate: { value: 1.5 },
        piecesListEnabled: { value: false },
        parallax: { value: 20 },
      })
    })

    it('should do nothing when storage is empty', () => {
      storageMock
        .expects('getItem')
        .withArgs('lichess-board-speaker-settings')
        .returns(null)

      loadSettings()

      expect(settings).toMatchObject({
        speakRate: { value: defaultSettings.speakRate },
        piecesListEnabled: { value: defaultSettings.piecesListEnabled },
      })
    })

    it('should handle partial settings', () => {
      const storedSettings = {
        speakRate: 2.0,
      }

      storageMock
        .expects('getItem')
        .withArgs('lichess-board-speaker-settings')
        .returns(JSON.stringify(storedSettings))

      loadSettings()

      expect(settings).toMatchObject({
        speakRate: { value: 2.0 },
        piecesListEnabled: { value: defaultSettings.piecesListEnabled },
      })
    })

    it('should ignore invalid JSON', () => {
      storageMock
        .expects('getItem')
        .withArgs('lichess-board-speaker-settings')
        .returns('invalid json')

      expect(() => loadSettings()).toThrow()
    })
  })

  describe('saveSettings', () => {
    it('should save current settings to storage', () => {
      settings.speakRate.value = 1.8
      settings.piecesListEnabled.value = false
      settings.parallax.value = 15

      const expectedData = {
        speakRate: 1.8,
        piecesListEnabled: false,
        dividersEnabled: defaultSettings.dividersEnabled,
        customBoardEnabled: defaultSettings.customBoardEnabled,
        obfuscationsEnabled: defaultSettings.obfuscationsEnabled,
        parallax: 15,
        hoverMode: defaultSettings.hoverMode,
        pieceStyle: defaultSettings.pieceStyle,
        blur: defaultSettings.blur,
        blackSegments: defaultSettings.blackSegments,
        blackSegmentsTiming: defaultSettings.blackSegmentsTiming,
        flashModeEnabled: defaultSettings.flashModeEnabled,
        flashDuration: defaultSettings.flashDuration,
        flashInterval: defaultSettings.flashInterval,
      }

      storageMock
        .expects('setItem')
        .withArgs('lichess-board-speaker-settings', JSON.stringify(expectedData))
        .returns(undefined)

      saveSettings()
    })

    it('should serialize all signal values', () => {
      const expectedData = {
        speakRate: defaultSettings.speakRate,
        piecesListEnabled: defaultSettings.piecesListEnabled,
        dividersEnabled: defaultSettings.dividersEnabled,
        customBoardEnabled: defaultSettings.customBoardEnabled,
        obfuscationsEnabled: defaultSettings.obfuscationsEnabled,
        parallax: defaultSettings.parallax,
        hoverMode: defaultSettings.hoverMode,
        pieceStyle: defaultSettings.pieceStyle,
        blur: defaultSettings.blur,
        blackSegments: defaultSettings.blackSegments,
        blackSegmentsTiming: defaultSettings.blackSegmentsTiming,
        flashModeEnabled: defaultSettings.flashModeEnabled,
        flashDuration: defaultSettings.flashDuration,
        flashInterval: defaultSettings.flashInterval,
      }

      storageMock
        .expects('setItem')
        .withArgs('lichess-board-speaker-settings', JSON.stringify(expectedData))
        .returns(undefined)

      saveSettings()
    })
  })

  describe('setupAutoSave', () => {
    it('should call saveSettings when effect runs', () => {
      const expectedJson = JSON.stringify({
        speakRate: defaultSettings.speakRate,
        piecesListEnabled: defaultSettings.piecesListEnabled,
        dividersEnabled: defaultSettings.dividersEnabled,
        customBoardEnabled: defaultSettings.customBoardEnabled,
        obfuscationsEnabled: defaultSettings.obfuscationsEnabled,
        parallax: defaultSettings.parallax,
        hoverMode: defaultSettings.hoverMode,
        pieceStyle: defaultSettings.pieceStyle,
        blur: defaultSettings.blur,
        blackSegments: defaultSettings.blackSegments,
        blackSegmentsTiming: defaultSettings.blackSegmentsTiming,
        flashModeEnabled: defaultSettings.flashModeEnabled,
        flashDuration: defaultSettings.flashDuration,
        flashInterval: defaultSettings.flashInterval,
      })

      storageMock
        .expects('setItem')
        .withArgs('lichess-board-speaker-settings', expectedJson)
        .returns(undefined)

      setupAutoSave()
    })
  })
})
