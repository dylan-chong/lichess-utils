import { mockModule } from 'simone'
import { beforeEach, describe, expect, it } from 'vitest'
import { defaultSettings } from '../../constants/settings'
import { createSettingsStore, loadSettings, saveSettings, setupAutoSave } from './settingsStore'

const storageMock = mockModule(import('../../platform/storage'))

describe('settingsStore', () => {
  let settings: ReturnType<typeof createSettingsStore>

  beforeEach(() => {
    settings = createSettingsStore()
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

      loadSettings(settings)

      expect(settings).toMatchObject({
        speakRate: { value: 1.5 },
        piecesListEnabled: { value: false },
        parallax: { value: 20 },
      })
    })

    it('should do nothing when storage is empty', () => {
      storageMock.expects('getItem').withArgs('lichess-board-speaker-settings').returns(null)

      loadSettings(settings)

      expect(settings).toMatchObject({
        speakRate: { value: defaultSettings.speakRate },
        piecesListEnabled: { value: defaultSettings.piecesListEnabled },
      })
    })

    it('should load only the settings present in storage', () => {
      const storedSettings = {
        speakRate: 2.0,
      }

      storageMock
        .expects('getItem')
        .withArgs('lichess-board-speaker-settings')
        .returns(JSON.stringify(storedSettings))

      loadSettings(settings)

      expect(settings).toMatchObject({
        speakRate: { value: 2.0 },
        piecesListEnabled: { value: defaultSettings.piecesListEnabled },
      })
    })

    it('should ignore unknown setting keys from storage', () => {
      const storedSettings = {
        unknownSetting: 'value',
        speakRate: 1.5,
      }

      storageMock
        .expects('getItem')
        .withArgs('lichess-board-speaker-settings')
        .returns(JSON.stringify(storedSettings))

      loadSettings(settings)

      expect(settings.speakRate.value).toBe(1.5)
    })

    it('should ignore invalid JSON', () => {
      storageMock
        .expects('getItem')
        .withArgs('lichess-board-speaker-settings')
        .returns('invalid json')

      expect(() => loadSettings(settings)).toThrow()
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

      saveSettings(settings)
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

      saveSettings(settings)
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

      setupAutoSave(settings)
    })
  })
})
