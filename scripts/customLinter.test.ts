import { describe, it, expect } from 'vitest'
import {
  getLayerFromPath,
  isImportAllowed,
  Layer,
  getViolationMessage,
} from './layerBoundaries'

describe('getLayerFromPath', () => {
  it('identifies platform layer files', () => {
    expect(getLayerFromPath('src/platform/dom.ts')).toBe(Layer.PLATFORM)
    expect(getLayerFromPath('./src/platform/storage.ts')).toBe(Layer.PLATFORM)
  })

  it('identifies constants layer files', () => {
    expect(getLayerFromPath('src/constants/settings.ts')).toBe(Layer.CONSTANTS)
    expect(getLayerFromPath('./src/constants/chess.ts')).toBe(Layer.CONSTANTS)
  })

  it('identifies domain layer files', () => {
    expect(getLayerFromPath('src/domain/chess/coordinates.ts')).toBe(Layer.DOMAIN)
    expect(getLayerFromPath('./src/domain/speech/speechText.ts')).toBe(Layer.DOMAIN)
  })

  it('identifies adapters layer files', () => {
    expect(getLayerFromPath('src/adapters-speech/speechSynthesizer.ts')).toBe(Layer.ADAPTERS)
    expect(getLayerFromPath('src/adapters-overlays/flash.ts')).toBe(Layer.ADAPTERS)
  })

  it('identifies application layer files', () => {
    expect(getLayerFromPath('src/application-services/boardReader.ts')).toBe(Layer.APPLICATION)
    expect(getLayerFromPath('src/application-handlers/handleSpeechCommand.ts')).toBe(Layer.APPLICATION)
  })

  it('identifies presentation layer files', () => {
    expect(getLayerFromPath('src/presentation/components/ControlPanel.tsx')).toBe(Layer.PRESENTATION)
    expect(getLayerFromPath('./src/presentation/contexts/SettingsContext.tsx')).toBe(Layer.PRESENTATION)
  })

  it('identifies root layer files', () => {
    expect(getLayerFromPath('src/init.tsx')).toBe(Layer.ROOT)
    expect(getLayerFromPath('src/main.tsx')).toBe(Layer.ROOT)
  })

  it('identifies test helpers', () => {
    expect(getLayerFromPath('src/test-helpers/mockSettings.ts')).toBe(Layer.TEST_HELPERS)
  })

  it('returns null for unknown paths', () => {
    expect(getLayerFromPath('src/unknown/file.ts')).toBe(null)
    expect(getLayerFromPath('package.json')).toBe(null)
  })
})

describe('isImportAllowed', () => {
  describe('platform layer', () => {
    it('allows imports from platform and constants', () => {
      expect(isImportAllowed(Layer.PLATFORM, Layer.PLATFORM)).toBe(true)
      expect(isImportAllowed(Layer.PLATFORM, Layer.CONSTANTS)).toBe(true)
    })

    it('disallows imports from higher layers', () => {
      expect(isImportAllowed(Layer.PLATFORM, Layer.DOMAIN)).toBe(false)
      expect(isImportAllowed(Layer.PLATFORM, Layer.ADAPTERS)).toBe(false)
      expect(isImportAllowed(Layer.PLATFORM, Layer.APPLICATION)).toBe(false)
      expect(isImportAllowed(Layer.PLATFORM, Layer.PRESENTATION)).toBe(false)
    })
  })

  describe('constants layer', () => {
    it('allows imports from constants only', () => {
      expect(isImportAllowed(Layer.CONSTANTS, Layer.CONSTANTS)).toBe(true)
    })

    it('disallows imports from all other layers', () => {
      expect(isImportAllowed(Layer.CONSTANTS, Layer.PLATFORM)).toBe(false)
      expect(isImportAllowed(Layer.CONSTANTS, Layer.DOMAIN)).toBe(false)
      expect(isImportAllowed(Layer.CONSTANTS, Layer.ADAPTERS)).toBe(false)
      expect(isImportAllowed(Layer.CONSTANTS, Layer.APPLICATION)).toBe(false)
      expect(isImportAllowed(Layer.CONSTANTS, Layer.PRESENTATION)).toBe(false)
    })
  })

  describe('domain layer', () => {
    it('allows imports from domain and constants', () => {
      expect(isImportAllowed(Layer.DOMAIN, Layer.DOMAIN)).toBe(true)
      expect(isImportAllowed(Layer.DOMAIN, Layer.CONSTANTS)).toBe(true)
    })

    it('disallows imports from platform and higher layers', () => {
      expect(isImportAllowed(Layer.DOMAIN, Layer.PLATFORM)).toBe(false)
      expect(isImportAllowed(Layer.DOMAIN, Layer.ADAPTERS)).toBe(false)
      expect(isImportAllowed(Layer.DOMAIN, Layer.APPLICATION)).toBe(false)
      expect(isImportAllowed(Layer.DOMAIN, Layer.PRESENTATION)).toBe(false)
    })
  })

  describe('adapters layer', () => {
    it('allows imports from adapters, platform, domain, and constants', () => {
      expect(isImportAllowed(Layer.ADAPTERS, Layer.ADAPTERS)).toBe(true)
      expect(isImportAllowed(Layer.ADAPTERS, Layer.PLATFORM)).toBe(true)
      expect(isImportAllowed(Layer.ADAPTERS, Layer.DOMAIN)).toBe(true)
      expect(isImportAllowed(Layer.ADAPTERS, Layer.CONSTANTS)).toBe(true)
    })

    it('disallows imports from application and presentation', () => {
      expect(isImportAllowed(Layer.ADAPTERS, Layer.APPLICATION)).toBe(false)
      expect(isImportAllowed(Layer.ADAPTERS, Layer.PRESENTATION)).toBe(false)
    })
  })

  describe('application layer', () => {
    it('allows imports from application, adapters, domain, platform, and constants', () => {
      expect(isImportAllowed(Layer.APPLICATION, Layer.APPLICATION)).toBe(true)
      expect(isImportAllowed(Layer.APPLICATION, Layer.ADAPTERS)).toBe(true)
      expect(isImportAllowed(Layer.APPLICATION, Layer.DOMAIN)).toBe(true)
      expect(isImportAllowed(Layer.APPLICATION, Layer.PLATFORM)).toBe(true)
      expect(isImportAllowed(Layer.APPLICATION, Layer.CONSTANTS)).toBe(true)
    })

    it('disallows imports from presentation', () => {
      expect(isImportAllowed(Layer.APPLICATION, Layer.PRESENTATION)).toBe(false)
    })
  })

  describe('presentation layer', () => {
    it('allows imports from all layers except root and test helpers', () => {
      expect(isImportAllowed(Layer.PRESENTATION, Layer.PRESENTATION)).toBe(true)
      expect(isImportAllowed(Layer.PRESENTATION, Layer.APPLICATION)).toBe(true)
      expect(isImportAllowed(Layer.PRESENTATION, Layer.ADAPTERS)).toBe(true)
      expect(isImportAllowed(Layer.PRESENTATION, Layer.DOMAIN)).toBe(true)
      expect(isImportAllowed(Layer.PRESENTATION, Layer.CONSTANTS)).toBe(true)
    })

    it('disallows imports from root', () => {
      expect(isImportAllowed(Layer.PRESENTATION, Layer.ROOT)).toBe(false)
    })
  })

  describe('root layer', () => {
    it('allows imports from all layers', () => {
      expect(isImportAllowed(Layer.ROOT, Layer.PRESENTATION)).toBe(true)
      expect(isImportAllowed(Layer.ROOT, Layer.APPLICATION)).toBe(true)
      expect(isImportAllowed(Layer.ROOT, Layer.ADAPTERS)).toBe(true)
      expect(isImportAllowed(Layer.ROOT, Layer.DOMAIN)).toBe(true)
      expect(isImportAllowed(Layer.ROOT, Layer.PLATFORM)).toBe(true)
      expect(isImportAllowed(Layer.ROOT, Layer.CONSTANTS)).toBe(true)
    })
  })

  describe('test helpers layer', () => {
    it('allows imports from all layers', () => {
      expect(isImportAllowed(Layer.TEST_HELPERS, Layer.TEST_HELPERS)).toBe(true)
      expect(isImportAllowed(Layer.TEST_HELPERS, Layer.PRESENTATION)).toBe(true)
      expect(isImportAllowed(Layer.TEST_HELPERS, Layer.APPLICATION)).toBe(true)
      expect(isImportAllowed(Layer.TEST_HELPERS, Layer.ADAPTERS)).toBe(true)
      expect(isImportAllowed(Layer.TEST_HELPERS, Layer.DOMAIN)).toBe(true)
      expect(isImportAllowed(Layer.TEST_HELPERS, Layer.PLATFORM)).toBe(true)
      expect(isImportAllowed(Layer.TEST_HELPERS, Layer.CONSTANTS)).toBe(true)
    })
  })
})

describe('getViolationMessage', () => {
  it('returns a descriptive error message for layer violations', () => {
    const message = getViolationMessage(Layer.DOMAIN, Layer.PLATFORM)
    expect(message).toContain('Layer boundary violation')
    expect(message).toContain('domain')
    expect(message).toContain('platform')
  })

  it('includes allowed layers in the message', () => {
    const message = getViolationMessage(Layer.DOMAIN, Layer.ADAPTERS)
    expect(message).toContain('domain, constants')
  })
})
