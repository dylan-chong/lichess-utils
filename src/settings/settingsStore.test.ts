import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { settings, loadSettings, saveSettings } from './settingsStore'

// Mock the storage module using Vitest's vi.mock
vi.mock('./storage', () => ({
  getItem: vi.fn(),
  setItem: vi.fn(),
}))

// Import the mocked storage module after mocking is set up
import * as storage from './storage'

describe('settingsStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exports all 14 settings as signals', () => {
    expect(settings.speakRate.value).toBeDefined()
    expect(settings.piecesListEnabled.value).toBeDefined()
    expect(settings.dividersEnabled.value).toBeDefined()
    expect(settings.customBoardEnabled.value).toBeDefined()
    expect(settings.obfuscationsEnabled.value).toBeDefined()
    expect(settings.parallax.value).toBeDefined()
    expect(settings.hoverMode.value).toBeDefined()
    expect(settings.pieceStyle.value).toBeDefined()
    expect(settings.blur.value).toBeDefined()
    expect(settings.blackSegments.value).toBeDefined()
    expect(settings.blackSegmentsTiming.value).toBeDefined()
    expect(settings.flashModeEnabled.value).toBeDefined()
    expect(settings.flashDuration.value).toBeDefined()
    expect(settings.flashInterval.value).toBeDefined()
  })

  it('loadSettings restores from localStorage', () => {
    vi.mocked(storage.getItem).mockReturnValue(
      JSON.stringify({ blur: 5, parallax: 45 })
    )

    loadSettings()

    expect(settings.blur.value).toBe(5)
    expect(settings.parallax.value).toBe(45)
  })

  it('saveSettings persists to localStorage', () => {
    settings.blur.value = 3

    saveSettings()

    expect(vi.mocked(storage.setItem)).toHaveBeenCalledWith(
      'lichess-board-speaker-settings',
      expect.stringContaining('"blur":3')
    )
  })
})
