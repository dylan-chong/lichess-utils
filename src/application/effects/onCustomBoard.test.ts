import { signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { describe, it } from 'vitest'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'
import { setupCustomBoardEffect } from './onCustomBoard'

const handleCustomBoardModule = mockModule(import('../handlers/handleCustomBoard'))

describe('onCustomBoard effect', () => {
  it('initializes custom board when enabled', () => {
    const state = {
      canvas: null,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      customBoardEnabled: signal(true),
      obfuscationsEnabled: signal(false),
      pieceStyle: signal('icons'),
    } as unknown as SettingsStore
    const boardChanged = signal(0)

    handleCustomBoardModule.expects('initCustomBoard').withArgs(state, settings).returns(undefined)

    const cleanup = setupCustomBoardEffect(state as CustomBoardState, settings, boardChanged)

    handleCustomBoardModule.expects('destroyCustomBoard').withArgs(state).returns(undefined)

    cleanup()
  })

  it('destroys custom board when disabled', () => {
    const state = {
      canvas: null,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      customBoardEnabled: signal(false),
      obfuscationsEnabled: signal(false),
      pieceStyle: signal('icons'),
    } as unknown as SettingsStore
    const boardChanged = signal(0)

    handleCustomBoardModule.expects('destroyCustomBoard').withArgs(state).returns(undefined)

    const cleanup = setupCustomBoardEffect(state as CustomBoardState, settings, boardChanged)

    handleCustomBoardModule.expects('destroyCustomBoard').withArgs(state).returns(undefined)

    cleanup()
  })

  it('reacts to customBoardEnabled changes', () => {
    const state = {
      canvas: null,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      customBoardEnabled: signal(true),
      obfuscationsEnabled: signal(false),
      pieceStyle: signal('icons'),
    } as unknown as SettingsStore
    const boardChanged = signal(0)

    handleCustomBoardModule.expects('initCustomBoard').withArgs(state, settings).returns(undefined)

    const cleanup = setupCustomBoardEffect(state as CustomBoardState, settings, boardChanged)

    handleCustomBoardModule.expects('destroyCustomBoard').withArgs(state).returns(undefined)

    settings.customBoardEnabled.value = false

    handleCustomBoardModule.expects('destroyCustomBoard').withArgs(state).returns(undefined)

    cleanup()
  })

  it('refreshes pieces when board changes and custom board is enabled', () => {
    const mockCanvas = { scene: {} } as any
    const state = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      customBoardEnabled: signal(true),
      obfuscationsEnabled: signal(false),
      pieceStyle: signal('icons'),
    } as unknown as SettingsStore
    const boardChanged = signal(0)

    handleCustomBoardModule.expects('initCustomBoard').withArgs(state, settings).returns(undefined)
    handleCustomBoardModule.expects('refreshPieces').withArgs(state, settings).returns(undefined)

    const cleanup = setupCustomBoardEffect(state as CustomBoardState, settings, boardChanged)

    handleCustomBoardModule.expects('refreshPieces').withArgs(state, settings).returns(undefined)

    boardChanged.value = 1

    handleCustomBoardModule.expects('destroyCustomBoard').withArgs(state).returns(undefined)

    cleanup()
  })

  it('does not refresh pieces when board changes and custom board is disabled', () => {
    const state = {
      canvas: null,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      customBoardEnabled: signal(false),
      obfuscationsEnabled: signal(false),
      pieceStyle: signal('icons'),
    } as unknown as SettingsStore
    const boardChanged = signal(0)

    handleCustomBoardModule.expects('destroyCustomBoard').withArgs(state).returns(undefined)

    const cleanup = setupCustomBoardEffect(state as CustomBoardState, settings, boardChanged)

    // No refreshPieces expectation - should not be called

    boardChanged.value = 1

    handleCustomBoardModule.expects('destroyCustomBoard').withArgs(state).returns(undefined)

    cleanup()
  })

  it('does not refresh pieces when board changes and canvas is null', () => {
    const state = {
      canvas: null,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      customBoardEnabled: signal(true),
      obfuscationsEnabled: signal(false),
      pieceStyle: signal('icons'),
    } as unknown as SettingsStore
    const boardChanged = signal(0)

    handleCustomBoardModule.expects('initCustomBoard').withArgs(state, settings).returns(undefined)

    const cleanup = setupCustomBoardEffect(state as CustomBoardState, settings, boardChanged)

    // No refreshPieces expectation - canvas is null

    boardChanged.value = 1

    handleCustomBoardModule.expects('destroyCustomBoard').withArgs(state).returns(undefined)

    cleanup()
  })

  it('destroys custom board on cleanup', () => {
    const mockCanvas = { scene: {} } as any
    const state = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      customBoardEnabled: signal(true),
      obfuscationsEnabled: signal(false),
      pieceStyle: signal('icons'),
    } as unknown as SettingsStore
    const boardChanged = signal(0)

    handleCustomBoardModule.expects('initCustomBoard').withArgs(state, settings).returns(undefined)
    handleCustomBoardModule.expects('refreshPieces').withArgs(state, settings).returns(undefined)

    const cleanup = setupCustomBoardEffect(state as CustomBoardState, settings, boardChanged)

    handleCustomBoardModule.expects('destroyCustomBoard').withArgs(state).returns(undefined)

    cleanup()
  })
})
